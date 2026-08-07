#!/usr/bin/env node
/**
 * Measure width/height of desktop UI design images (+ optional collectionFrame).
 * Usage: node measure-aspect-ratios.mjs <desktop-dir>
 * Looks for ../collectionFrame.png relative to the desktop dir.
 * Does not measure mobile/ — mobileFeeds are image data only.
 * Prints JSON and ready-to-paste desktopFeedAspectRatios / aspectRatio /
 * collectionFrameAspectRatio.
 *
 * Parent aspectRatio = sum of feed widths at LAYOUT_HEIGHT + (n-1)*GAP_PX gaps
 * (WithNotebookPortofolioLayout: flex-row, h-full, gap-6).
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

/** Matches existing portofolio `aspectRatio` denominator convention. */
const LAYOUT_HEIGHT = 1080;
/** Tailwind `gap-6` → 1.5rem at 16px root. */
const GAP_PX = 24;

const dir = process.argv[2];
if (!dir) {
  console.error('Usage: node measure-aspect-ratios.mjs <desktop-dir>');
  process.exit(1);
}

const abs = path.resolve(dir);
if (!fs.existsSync(abs) || !fs.statSync(abs).isDirectory()) {
  console.error(`Not a directory: ${abs}`);
  process.exit(1);
}

const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif']);

/** Trailing integer in basename (before extension); NaN if none. */
function feedOrderKey(filename) {
  const base = path.basename(filename, path.extname(filename));
  const match = /(\d+)$/.exec(base);
  return match ? Number(match[1]) : Number.NaN;
}

function compareFeedFilenames(a, b) {
  const na = feedOrderKey(a);
  const nb = feedOrderKey(b);
  const aHas = Number.isFinite(na);
  const bHas = Number.isFinite(nb);
  if (aHas && bHas && na !== nb) return na - nb;
  if (aHas !== bHas) return aHas ? -1 : 1;
  return a.localeCompare(b, undefined, { numeric: true });
}

const files = fs
  .readdirSync(abs)
  .filter((name) => IMAGE_EXT.has(path.extname(name).toLowerCase()))
  .sort(compareFeedFilenames);

if (files.length === 0) {
  console.error(`No images found in ${abs}`);
  process.exit(1);
}

function measureWithSips(filePath) {
  const out = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', filePath], {
    encoding: 'utf8',
  });
  const width = Number(/pixelWidth:\s*(\d+)/.exec(out)?.[1]);
  const height = Number(/pixelHeight:\s*(\d+)/.exec(out)?.[1]);
  if (!width || !height) {
    throw new Error(`Could not read dimensions for ${filePath}`);
  }
  return { width, height };
}

function measureFile(filePath, label = path.basename(filePath)) {
  const { width, height } = measureWithSips(filePath);
  return {
    file: label,
    width,
    height,
    aspectRatio: `${width}/${height}`,
  };
}

/** Parent layout ratio that contains all desktop feeds side-by-side with gaps. */
function computeParentAspectRatio(feeds) {
  const widths = feeds.map((r) => (LAYOUT_HEIGHT * r.width) / r.height);
  const gaps = Math.max(0, feeds.length - 1) * GAP_PX;
  const totalWidth = Math.round(widths.reduce((sum, w) => sum + w, 0) + gaps);
  return `${totalWidth}/${LAYOUT_HEIGHT}`;
}

const results = files.map((file) => measureFile(path.join(abs, file), file));
const parentAspectRatio = computeParentAspectRatio(results);

const collectionFramePath = path.join(abs, '..', 'collectionFrame.png');
const collectionFrame = fs.existsSync(collectionFramePath)
  ? measureFile(collectionFramePath, 'collectionFrame.png')
  : null;

console.log(
  JSON.stringify(
    {
      desktop: results,
      aspectRatio: parentAspectRatio,
      collectionFrame,
    },
    null,
    2,
  ),
);

console.error(
  `\ndesktopFeedAspectRatios: [${results.map((r) => `'${r.aspectRatio}'`).join(', ')}]`,
);
console.error(`aspectRatio: '${parentAspectRatio}'`);
if (collectionFrame) {
  console.error(`collectionFrameAspectRatio: '${collectionFrame.aspectRatio}'`);
} else {
  console.error(`collectionFrameAspectRatio: (missing ${collectionFramePath})`);
}
