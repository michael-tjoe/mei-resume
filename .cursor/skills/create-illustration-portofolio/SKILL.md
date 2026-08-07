---
name: create-illustration-portofolio
description: >-
  Generate a NotebookCompanyBlock illustration portfolio entry from
  `illus{Name}/desktop` (and optional `mobile`) screenshots. Use when adding a
  new illustration portfolio, scaffolding from illusClientProjects-style asset
  folders, or when the user mentions create-illustration-portofolio.
---

# Create illustration portofolio

Generate a `NotebookCompanyBlock` from illustration screenshots and append it to
`app/containers/Portofolio/constants/illustrations.ts`.

## Input

Asset folders:

```text
app/containers/Portofolio/assets/illus{Name}/desktop/
app/containers/Portofolio/assets/illus{Name}/mobile/   # optional
```

Examples: `illusClientProjects/desktop`, `illusClientProjects/mobile`.

Expect PNG (or other static image) files under `desktop/` (typically three),
ordered by the trailing number in the filename (before the extension). If
`mobile/` exists and has images, use them for `mobileFeeds`; otherwise
`mobileFeeds: []`.

Optional collection frame at the folder root:

```text
app/containers/Portofolio/assets/illus{Name}/collectionFrame.png
```

## Naming from folder

Folder segment is always `illus` + camelCase name:

| Piece | Example (`illusClientProjects`) |
| --- | --- |
| Folder | `illusClientProjects` |
| Strip prefix | `ClientProjects` |
| `name` | `Client Projects` (split camelCase; override if user provides) |
| Export const | `CLIENT_PROJECTS_ILLUSTRATIONS` |
| Desktop feeds const | `CLIENT_PROJECTS_ILLUSTRATION_FEEDS` |
| Mobile feeds const | `CLIENT_PROJECTS_ILLUSTRATION_MOBILE_FEEDS` (only if mobile images exist) |

Algorithm:

1. Folder must start with `illus` (case-sensitive).
2. Remainder is the name key in camelCase (`ClientProjects`).
3. Display `name`: insert a space before each capital (`Client Projects`). Prefer
   a user-provided display name when given.
4. SCREAMING_SNAKE key: uppercase + underscores (`CLIENT_PROJECTS`).
5. Export: `{KEY}_ILLUSTRATIONS`.
6. Desktop feeds: `{KEY}_ILLUSTRATION_FEEDS`.
7. Mobile feeds (when present): `{KEY}_ILLUSTRATION_MOBILE_FEEDS`.

## Object generated

```ts
{
  name: '{derived or user-provided name}',
  subtitle: 'illustration',
  href: '',
  hrefType: '',
  mobileFeeds: /* images from mobile/ when present, else [] */,
  desktopFeeds: /* list of image from desktop/ */,
  desktopFeedAspectRatios: /* list of image aspect ratio from desktop/ */,
  // Always include — computed parent layout ratio (see Measure step)
  aspectRatio: '{computed W/1080}',
  // Only when collectionFrame.png exists
  collectionFrame: /* import from illus{Name}/collectionFrame.png */,
  collectionFrameAspectRatio: /* "{width}/{height}" from collectionFrame.png */,
  // Optional — defaults to { right: 0, bottom: 0 }
  collectionFramePosition: { right: 0, bottom: 0 },
}
```

Always set `hrefType: ''` unless the user provides `'ig'` or `'website'`.
Leave `href` empty unless the user provides one. Always include a computed
`aspectRatio` from the measure helper (do not hardcode `1965/1080`). Include
`collectionFrame` + `collectionFrameAspectRatio` only when
`collectionFrame.png` exists. Omit `collectionFramePosition` unless non-default.

## Workflow

Copy and track:

```text
Task Progress:
- [ ] 1. Resolve illus folder + display name + const names
- [ ] 2. List desktop images (by filename number) + optional mobile + collectionFrame
- [ ] 3. Measure desktop + collectionFrame aspect ratios
- [ ] 4. Add imports + feeds + portofolio object in illustrations.ts
- [ ] 5. Append to ILLUSTRATIONS_PORTOFOLIO
```

### 1. Resolve folder + names

- Folder: `illus{Name}` under `app/containers/Portofolio/assets/`.
- Derive `name`, `{KEY}_ILLUSTRATIONS`, and feed const names per
  **Naming from folder** above.

### 2. List desktop + mobile images + collectionFrame

List files under:

`app/containers/Portofolio/assets/illus{Name}/desktop/`

**Feed order (required):** sort by the trailing integer in the basename
(strip extension, then take the last run of digits). Examples:

| Filename | Order key |
| --- | --- |
| `ill-client-project-1.png` | `1` |
| `ill-client-project-2.png` | `2` |
| `ill-10.png` | `10` (not after `1` as a string) |

Ascending numeric order → index 0 = lowest number. Do **not** rely on plain
alphabetical sort (`…-10` before `…-2`). Ties / missing numbers: fall back to
`localeCompare` with `{ numeric: true }`. Layout expects **exactly 3** desktop
feeds (tuple of aspect ratios).

Also list (if the directory exists):

`app/containers/Portofolio/assets/illus{Name}/mobile/`

Sort the same way (trailing filename number). If one or more images exist, those
become `mobileFeeds`. If the folder is missing or empty, `mobileFeeds: []`.

If present, confirm:

`app/containers/Portofolio/assets/illus{Name}/collectionFrame.png`

### 3. Measure aspect ratios

Run the helper (preferred). Pass the **desktop** folder; it also measures
`../collectionFrame.png` when present and computes parent `aspectRatio`:

```bash
node .cursor/skills/create-illustration-portofolio/scripts/measure-aspect-ratios.mjs \
  "app/containers/Portofolio/assets/illus{Name}/desktop"
```

Or with `sips` + the formula below:

```bash
sips -g pixelWidth -g pixelHeight path/to/desktop/*.png path/to/collectionFrame.png
```

Each feed ratio string is `"{width}/{height}"` (raw pixels, do not reduce).

#### Parent `aspectRatio` (required)

`IllustrationPortofolioLayout` is a full-height flex row with `gap-6`. Compute
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
- `collectionFrameAspectRatio: 'W/H'` (when frame exists)

Do not measure mobile images for aspect ratios — `mobileFeeds` is image data only.

### 4. Edit `illustrations.ts`

1. Ensure `StaticImageData` and `NotebookCompanyBlock` imports exist.
2. If `collectionFrame.png` exists, import it with a unique binding
   (e.g. `clientProjectsCollectionFrame`).
3. Import each desktop image as a camelCase binding matching the filename.
4. Build `{KEY}_ILLUSTRATION_FEEDS` from those imports **in trailing-number order**
   (same order as step 2 / measure helper).
5. If mobile images exist: import them, build `{KEY}_ILLUSTRATION_MOBILE_FEEDS`
   in trailing-number order, and set `mobileFeeds` to that const. Otherwise
   `mobileFeeds: []`.
6. Add the portofolio object:

```ts
export const {KEY}_ILLUSTRATIONS: NotebookCompanyBlock = {
  name: '{display name}',
  subtitle: 'illustration',
  href: '',
  hrefType: '',
  mobileFeeds: {KEY}_ILLUSTRATION_MOBILE_FEEDS, // or []
  desktopFeeds: {KEY}_ILLUSTRATION_FEEDS,
  desktopFeedAspectRatios: ['W1/H1', 'W2/H2', 'W3/H3'],
  aspectRatio: 'W/1080', // from measure helper
  // collectionFrame + collectionFrameAspectRatio when frame exists
};
```

Match existing import style and const patterns in the file. Scaffold the file
(imports, feeds, `ILLUSTRATIONS_PORTOFOLIO` array) if it is empty or incomplete.

### 5. Register

Append `{KEY}_ILLUSTRATIONS` to `ILLUSTRATIONS_PORTOFOLIO`.

```ts
export const ILLUSTRATIONS_PORTOFOLIO: NotebookCompanyBlock[] = [
  // ...existing,
  {KEY}_ILLUSTRATIONS,
];
```

## Naming helpers

| Piece | Example (`illusClientProjects`) |
| --- | --- |
| Desktop folder | `illusClientProjects/desktop` |
| Mobile folder | `illusClientProjects/mobile` |
| Collection frame | `../assets/illusClientProjects/collectionFrame.png` |
| Collection binding | `clientProjectsCollectionFrame` |
| Desktop import | `../assets/illusClientProjects/desktop/ill-client-project-1.png` |
| Desktop binding | `illClientProject1` |
| Mobile import | `../assets/illusClientProjects/mobile/ill-client-project-1.png` |
| Mobile binding | `illClientProjectMobile1` (disambiguate if needed) |
| Desktop feeds | `CLIENT_PROJECTS_ILLUSTRATION_FEEDS` |
| Mobile feeds | `CLIENT_PROJECTS_ILLUSTRATION_MOBILE_FEEDS` |
| Export | `CLIENT_PROJECTS_ILLUSTRATIONS` |
| `name` | `Client Projects` |
| `subtitle` | `'illustration'` |
| `hrefType` | `''` (default) |
| `aspectRatio` | computed `'W/1080'` from feeds + `gap-6` (always include) |

## Do not

- Invent `href`, Instagram handles, or `collectionFrame` without assets/user input.
- Default `hrefType` to `'website'` or `'ig'` — illustrations default to `''`.
- Use subtitle `'ui design'` — illustrations always use `'illustration'`.
- Omit `aspectRatio` — always set the computed `'W/1080'` from the measure helper.
- Hardcode `aspectRatio: '1965/1080'` — calculate from desktop feeds + gaps.
- Skip `mobileFeeds` when `mobile/` has images — always fill from that folder.
- Skip `collectionFrame` / `collectionFrameAspectRatio` when `collectionFrame.png`
  exists; invent them when it does not.
- Copy a desktop feed ratio into `collectionFrameAspectRatio` — always measure the
  frame file itself.
- Reorder images relative to trailing filename numbers (before extension).
- Use plain alphabetical order when numbers would disagree (`-10` vs `-2`).
- Skip registering the new object in `ILLUSTRATIONS_PORTOFOLIO`.
- Mis-derive names: `illusClientProjects` → `CLIENT_PROJECTS_ILLUSTRATIONS`, not
  `ILLUS_CLIENT_PROJECTS_*`.
