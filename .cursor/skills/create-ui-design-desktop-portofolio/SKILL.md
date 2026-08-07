---
name: create-ui-design-desktop-portofolio
description: >-
  Generate a NotebookCompanyBlock UI design portfolio entry from
  `{companyName}UiDesign/desktop` screenshots. Use when adding a new UI design
  desktop portfolio, scaffolding from iceBsdUiDesign/gebrakUiDesign-style asset
  folders, or when the user mentions create-ui-design-desktop-portofolio.
---

# Create UI design desktop portofolio

Generate a `NotebookCompanyBlock` from desktop UI screenshots and append it to
`app/containers/Portofolio/constants/uiDesigns.ts`.

## Input

Asset folder:

```text
app/containers/Portofolio/assets/{companyName}UiDesign/desktop/
```

Examples: `gebrakUiDesign/desktop`, `iceBsdUiDesign/desktop`.

Expect PNG (or other static image) files, typically three, sorted by filename.

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
  mobileFeeds: [],
  desktopFeeds: /* list of image from the folder */,
  desktopFeedAspectRatios: /* list of image aspect ratio from the folder */,
  // Always include — default notebook layout ratio
  aspectRatio: '1965/1080',
  collectionFrame: /* import from {companyName}UiDesign/collectionFrame.png */,
  collectionFrameAspectRatio: /* "{width}/{height}" from collectionFrame.png */,
  // Optional — defaults to { right: 0, bottom: 0 }
  collectionFramePosition: { right: 0, bottom: 0 },
}
```

Also set `hrefType: 'website'` so the object satisfies `NotebookCompanyBlock`
(required by `FeaturedCompanyBlock`). Leave `href` empty unless the user provides
one. Always include `aspectRatio: '1965/1080'` (override only when the layout
needs a different notebook ratio). Always include `collectionFrame` and
`collectionFrameAspectRatio` when `{companyName}UiDesign/collectionFrame.png`
exists (import the image, measure its pixels, and set both fields). Omit
`collectionFramePosition` unless the layout needs a non-default value.

## Workflow

Copy and track:

```text
Task Progress:
- [ ] 1. Resolve company folder + display name
- [ ] 2. List desktop images (sorted) + collectionFrame
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
- Feeds const: `{COMPANY}_UI_FEEDS`.

### 2. List desktop images + collectionFrame

List files under:

`app/containers/Portofolio/assets/{companyName}UiDesign/desktop/`

Sort alphabetically so `-1`, `-2`, `-3` stay in order. Notebook layout expects
**exactly 3** desktop feeds (tuple of aspect ratios).

Confirm `collectionFrame.png` exists at:

`app/containers/Portofolio/assets/{companyName}UiDesign/collectionFrame.png`

### 3. Measure aspect ratios

Run the helper (preferred). Pass the **desktop** folder; it also measures
`../collectionFrame.png` when present:

```bash
node .cursor/skills/create-ui-design-desktop-portofolio/scripts/measure-aspect-ratios.mjs \
  "app/containers/Portofolio/assets/{companyName}UiDesign/desktop"
```

Or with `sips`:

```bash
sips -g pixelWidth -g pixelHeight path/to/desktop/*.png path/to/collectionFrame.png
```

Each ratio string is `"{width}/{height}"` (raw pixels, do not reduce).

Use stderr paste lines from the helper:

- `desktopFeedAspectRatios: ['W1/H1', 'W2/H2', 'W3/H3']`
- `collectionFrameAspectRatio: 'W/H'`

### 4. Edit `uiDesigns.ts`

1. Import `collectionFrame` from
   `../assets/{companyName}UiDesign/collectionFrame.png` (use a unique binding
   if multiple companies import frames, e.g. `iceBsdCollectionFrame`).
2. Import each desktop image as a camelCase binding matching the filename.
3. Build `{COMPANY}_UI_FEEDS` from those imports **in folder order**.
4. Add the portofolio object:

```ts
export const {COMPANY}_UI_PORTOFOLIO: NotebookCompanyBlock = {
  name: '{company name}',
  subtitle: 'ui design',
  href: '',
  hrefType: 'website',
  mobileFeeds: [],
  desktopFeeds: {COMPANY}_UI_FEEDS,
  desktopFeedAspectRatios: ['W1/H1', 'W2/H2', 'W3/H3'],
  aspectRatio: '1965/1080',
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
| Folder | `iceBsdUiDesign/desktop` |
| Collection frame | `../assets/iceBsdUiDesign/collectionFrame.png` |
| Collection binding | `iceBsdCollectionFrame` |
| Import path | `../assets/iceBsdUiDesign/desktop/ice-bsd-desktop-1.png` |
| Import binding | `iceBsdDesktop1` |
| Feeds const | `ICE_BSD_UI_FEEDS` |
| Export | `ICE_BSD_UI_PORTOFOLIO` |
| `name` | `ICE BSD` (or user-provided) |
| `aspectRatio` | `'1965/1080'` (default; always include) |
| `collectionFrameAspectRatio` | `'2548/2160'` (from measured pixels) |

## Do not

- Invent `href`, Instagram handles, or `collectionFrame` without assets/user input.
- Omit `aspectRatio` — always set it (default `'1965/1080'`).
- Skip `collectionFrame` or `collectionFrameAspectRatio` when `collectionFrame.png`
  exists in the company folder.
- Copy a desktop feed ratio into `collectionFrameAspectRatio` — always measure the
  frame file itself.
- Reorder images relative to sorted filenames.
- Put non-empty `mobileFeeds` unless the user asks.
- Skip registering the new object in `UI_DESIGNS_PORTOFOLIO`.
