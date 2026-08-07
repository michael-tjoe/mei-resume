---
name: create-ui-design-portofolio
description: >-
  Generate a NotebookCompanyBlock UI design portfolio entry from
  `{companyName}UiDesign/desktop` (and optional `mobile`) screenshots. Use when
  adding a new UI design portfolio, scaffolding from iceBsdUiDesign/gebrakUiDesign-style
  asset folders, or when the user mentions create-ui-design-portofolio.
---

# Create UI design portofolio

Generate a `NotebookCompanyBlock` from UI design screenshots and append it to
`app/containers/Portofolio/constants/uiDesigns.ts`.

## Input

Asset folders:

```text
app/containers/Portofolio/assets/{companyName}UiDesign/desktop/
app/containers/Portofolio/assets/{companyName}UiDesign/mobile/   # optional
```

Examples: `gebrakUiDesign/desktop`, `iceBsdUiDesign/desktop`,
`iceBsdUiDesign/mobile`.

Expect PNG (or other static image) files under `desktop/` (typically three),
ordered by the trailing number in the filename (before the extension). If
`mobile/` exists and has images, use them for `mobileFeeds`; otherwise
`mobileFeeds: []`.

Also expect a collection frame at the company folder root:

```text
app/containers/Portofolio/assets/{companyName}UiDesign/collectionFrame.png
```

## Object generated

```ts
{
  name: '{company name}',
  subtitle: 'ui design',
  href: '',
  hrefType: 'website',
  mobileFeeds: /* images from mobile/ when present, else [] */,
  desktopFeeds: /* list of image from desktop/ */,
  desktopFeedAspectRatios: /* list of image aspect ratio from desktop/ */,
  // Always include — computed parent layout ratio (see Measure step)
  aspectRatio: '{computed W/1080}',
  collectionFrame: /* import from {companyName}UiDesign/collectionFrame.png */,
  collectionFrameAspectRatio: /* "{width}/{height}" from collectionFrame.png */,
  // Optional — defaults to { right: 0, bottom: 0 }
  collectionFramePosition: { right: 0, bottom: 0 },
}
```

Also set `hrefType: 'website'` so the object satisfies `NotebookCompanyBlock`
(required by `FeaturedCompanyBlock`). Leave `href` empty unless the user provides
one. Always include a computed `aspectRatio` from the measure helper (do not
hardcode `1965/1080`). Always include `collectionFrame` and
`collectionFrameAspectRatio` when `{companyName}UiDesign/collectionFrame.png`
exists (import the image, measure its pixels, and set both fields). Omit
`collectionFramePosition` unless the layout needs a non-default value.

## Workflow

Copy and track:

```text
Task Progress:
- [ ] 1. Resolve company folder + display name
- [ ] 2. List desktop images (by filename number) + optional mobile + collectionFrame
- [ ] 3. Measure desktop + collectionFrame aspect ratios
- [ ] 4. Add imports + feeds + portofolio object in uiDesigns.ts
- [ ] 5. Append to UI_DESIGNS_PORTOFOLIO
```

### 1. Resolve company folder + display name

- Folder segment: `{companyName}UiDesign` (camelCase), e.g. `iceBsd`, `gebrak`.
- `name`: human-readable company name from the user, or derive from the folder
  (`iceBsd` → `ICE BSD`, `gebrak` → keep user-provided handle if given).
- Export const: `{COMPANY}_UI_PORTOFOLIO` in `SCREAMING_SNAKE_CASE`
  (`ICE_BSD_UI_PORTOFOLIO`).
- Desktop feeds const: `{COMPANY}_UI_FEEDS`.
- Mobile feeds const (when present): `{COMPANY}_UI_MOBILE_FEEDS`.

### 2. List desktop + mobile images + collectionFrame

List files under:

`app/containers/Portofolio/assets/{companyName}UiDesign/desktop/`

**Feed order (required):** sort by the trailing integer in the basename
(strip extension, then take the last run of digits). Examples:

| Filename | Order key |
| --- | --- |
| `ice-bsd-desktop-1.png` | `1` |
| `ice-bsd-desktop-2.png` | `2` |
| `gebrak-desktop-10.png` | `10` (not after `1` as a string) |

Ascending numeric order → index 0 = lowest number. Do **not** rely on plain
alphabetical sort (`…-10` before `…-2`). Ties / missing numbers: fall back to
`localeCompare` with `{ numeric: true }`. Notebook layout expects **exactly 3**
desktop feeds (tuple of aspect ratios).

Also list (if the directory exists):

`app/containers/Portofolio/assets/{companyName}UiDesign/mobile/`

Sort the same way (trailing filename number). If one or more images exist, those
become `mobileFeeds`. If the folder is missing or empty, `mobileFeeds: []`.

Confirm `collectionFrame.png` exists at:

`app/containers/Portofolio/assets/{companyName}UiDesign/collectionFrame.png`

### 3. Measure aspect ratios

Run the helper (preferred). Pass the **desktop** folder; it also measures
`../collectionFrame.png` when present and computes parent `aspectRatio`:

```bash
node .cursor/skills/create-ui-design-portofolio/scripts/measure-aspect-ratios.mjs \
  "app/containers/Portofolio/assets/{companyName}UiDesign/desktop"
```

Or with `sips` + the formula below:

```bash
sips -g pixelWidth -g pixelHeight path/to/desktop/*.png path/to/collectionFrame.png
```

Each feed ratio string is `"{width}/{height}"` (raw pixels, do not reduce).

#### Parent `aspectRatio` (required)

`WithNotebookPortofolioLayout` is a full-height flex row with `gap-6`. Compute
the parent ratio so all three desktop feeds fit side-by-side:

1. Normalize each feed to height `1080`: `width_i = 1080 * (W_i / H_i)`.
2. Add gaps: `gap-6` = `24px` between feeds → `(n - 1) * 24` (for 3 feeds: `48`).
3. `aspectRatio = "{round(sum(width_i) + gaps)}/1080"`.

Example (`1340/1682`, `1080/2160`, `1524/2154`):

```text
860.40 + 540 + 764.12 + 48 ≈ 2213
→ aspectRatio: '2213/1080'
```

Use stderr paste lines from the helper:

- `desktopFeedAspectRatios: ['W1/H1', 'W2/H2', 'W3/H3']`
- `aspectRatio: 'W/1080'` (always paste this — do not default to `1965/1080`)
- `collectionFrameAspectRatio: 'W/H'`

Do not measure mobile images for aspect ratios — `mobileFeeds` is image data only.

### 4. Edit `uiDesigns.ts`

1. Import `collectionFrame` from
   `../assets/{companyName}UiDesign/collectionFrame.png` (use a unique binding
   if multiple companies import frames, e.g. `iceBsdCollectionFrame`).
2. Import each desktop image as a camelCase binding matching the filename.
3. Build `{COMPANY}_UI_FEEDS` from those imports **in trailing-number order**
   (same order as step 2 / measure helper).
4. If mobile images exist: import them, build `{COMPANY}_UI_MOBILE_FEEDS` in
   trailing-number order, and set `mobileFeeds` to that const. Otherwise
   `mobileFeeds: []`.
5. Add the portofolio object:

```ts
export const {COMPANY}_UI_PORTOFOLIO: NotebookCompanyBlock = {
  name: '{company name}',
  subtitle: 'ui design',
  href: '',
  hrefType: 'website',
  mobileFeeds: {COMPANY}_UI_MOBILE_FEEDS, // or []
  desktopFeeds: {COMPANY}_UI_FEEDS,
  desktopFeedAspectRatios: ['W1/H1', 'W2/H2', 'W3/H3'],
  aspectRatio: 'W/1080', // from measure helper
  collectionFrame: {companyName}CollectionFrame,
  collectionFrameAspectRatio: 'WF/HF',
};
```

Match existing import style and const patterns in the file.

### 5. Register

Append `{COMPANY}_UI_PORTOFOLIO` to `UI_DESIGNS_PORTOFOLIO`.

## Naming helpers

| Piece | Example (`iceBsd`) |
| --- | --- |
| Desktop folder | `iceBsdUiDesign/desktop` |
| Mobile folder | `iceBsdUiDesign/mobile` |
| Collection frame | `../assets/iceBsdUiDesign/collectionFrame.png` |
| Collection binding | `iceBsdCollectionFrame` |
| Desktop import | `../assets/iceBsdUiDesign/desktop/ice-bsd-desktop-1.png` |
| Desktop binding | `iceBsdDesktop1` |
| Mobile import | `../assets/iceBsdUiDesign/mobile/ice-bsd-mobile-1.png` |
| Mobile binding | `iceBsdMobile1` (disambiguate if needed) |
| Desktop feeds | `ICE_BSD_UI_FEEDS` |
| Mobile feeds | `ICE_BSD_UI_MOBILE_FEEDS` |
| Export | `ICE_BSD_UI_PORTOFOLIO` |
| `name` | `ICE BSD` (or user-provided) |
| `aspectRatio` | computed `'W/1080'` from feeds + `gap-6` (always include) |
| `collectionFrameAspectRatio` | `'2548/2160'` (from measured pixels) |

## Do not

- Invent `href`, Instagram handles, or `collectionFrame` without assets/user input.
- Omit `aspectRatio` — always set the computed `'W/1080'` from the measure helper.
- Hardcode `aspectRatio: '1965/1080'` — calculate from desktop feeds + gaps.
- Skip `mobileFeeds` when `mobile/` has images — always fill from that folder.
- Skip `collectionFrame` or `collectionFrameAspectRatio` when `collectionFrame.png`
  exists in the company folder.
- Copy a desktop feed ratio into `collectionFrameAspectRatio` — always measure the
  frame file itself.
- Reorder images relative to trailing filename numbers (before extension).
- Use plain alphabetical order when numbers would disagree (`-10` vs `-2`).
- Put non-empty `mobileFeeds` when `mobile/` is missing or empty.
- Skip registering the new object in `UI_DESIGNS_PORTOFOLIO`.
