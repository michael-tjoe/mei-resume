#!/usr/bin/env node
/**
 * Measure width/height of desktop UI design images (+ optional collectionFrame).
 * Usage: node measure-aspect-ratios.mjs <desktop-dir>
 * Looks for ../collectionFrame.png relative to the desktop dir.
 * Prints JSON and ready-to-paste desktopFeedAspectRatios / collectionFrameAspectRatio.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

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

const files = fs
  .readdirSync(abs)
  .filter((name) => IMAGE_EXT.has(path.extname(name).toLowerCase()))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

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

const results = files.map((file) => measureFile(path.join(abs, file), file));

const collectionFramePath = path.join(abs, '..', 'collectionFrame.png');
const collectionFrame = fs.existsSync(collectionFramePath)
  ? measureFile(collectionFramePath, 'collectionFrame.png')
  : null;

console.log(
  JSON.stringify(
    {
      desktop: results,
      collectionFrame,
    },
    null,
    2,
  ),
);

console.error(
  `\ndesktopFeedAspectRatios: [${results.map((r) => `'${r.aspectRatio}'`).join(', ')}]`,
);
if (collectionFrame) {
  console.error(`collectionFrameAspectRatio: '${collectionFrame.aspectRatio}'`);
} else {
  console.error(`collectionFrameAspectRatio: (missing ${collectionFramePath})`);
}
