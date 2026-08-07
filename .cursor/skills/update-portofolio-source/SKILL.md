---
name: update-portofolio-source
description: >-
  Refresh only `mobileFeeds` and `desktopFeeds` on an existing NotebookCompanyBlock
  from a given asset folder (`illus{Name}` or `{company}UiDesign`). Use when
  replacing portfolio feed images, syncing feeds from disk, or when the user
  mentions update-portofolio-source.
---

# Update portofolio source

Update **only** `mobileFeeds` and `desktopFeeds` on an existing portfolio object
from a given asset folder. Do not change any other fields.

## Input

User provides an asset folder under `app/containers/Portofolio/assets/`:

```text
illus{Name}/                          # illustration
{companyName}UiDesign/                # UI design
```

Or a nested path (`…/desktop`, `…/mobile`) — treat the company/illus folder as root.

Expected structure:

```text
{folder}/desktop/   # required — images for desktopFeeds
{folder}/mobile/    # optional — images for mobileFeeds
```

Ignore `collectionFrame.png` and any other non-feed files.

## Target file + object

| Folder pattern | Constants file | Object |
| --- | --- | --- |
| `illus{Name}` | `constants/illustrations.ts` | `{KEY}_ILLUSTRATIONS` |
| `{company}UiDesign` | `constants/uiDesigns.ts` | matching `*_UI_PORTOFOLIO` / existing export for that company |

Resolve the existing export by matching the folder to current imports/paths in the
constants file. If no matching object exists, stop and tell the user — this skill
does **not** create new portfolio entries (use create-*-portofolio skills).

## What to update

Allowed changes only:

1. Image imports for files under `{folder}/desktop/` and `{folder}/mobile/`
2. Desktop feeds const array (e.g. `{KEY}_ILLUSTRATION_FEEDS`, `{KEY}_UI_FEEDS`)
3. Mobile feeds const array when mobile images exist (create/update/remove as needed)
4. Object fields:
   - `desktopFeeds: …`
   - `mobileFeeds: …` (array const, or `[]` if no mobile images)

## What not to update

Do **not** change:

- `name`, `subtitle`, `href`, `hrefType`
- `desktopFeedAspectRatios`
- `aspectRatio`
- `collectionFrame`, `collectionFrameAspectRatio`, `collectionFramePosition`
- `ILLUSTRATIONS_PORTOFOLIO` / `UI_DESIGNS_PORTOFOLIO` registration
- Layout components, types, or unrelated objects in the same file
- Collection frame imports

Even if image dimensions changed, leave aspect-ratio fields as-is unless the user
explicitly asks to remeasure (out of scope for this skill).

## Workflow

```text
Task Progress:
- [ ] 1. Resolve folder + matching constants object
- [ ] 2. List desktop/ (+ mobile/) images by filename number
- [ ] 3. Sync imports + feed consts
- [ ] 4. Set only desktopFeeds + mobileFeeds on the object
```

### 1. Resolve folder + object

- Normalize to `app/containers/Portofolio/assets/{folder}/`.
- Open the matching constants file and find the object whose feed imports point at
  that folder (or whose naming matches the folder key).

### 2. List images

```bash
ls "app/containers/Portofolio/assets/{folder}/desktop"
ls "app/containers/Portofolio/assets/{folder}/mobile"  # if exists
```

**Feed order (required):** sort by the trailing integer in the basename (strip
extension, then take the last run of digits). Examples:

| Filename | Order key |
| --- | --- |
| `ill-client-project-1.png` | `1` |
| `ice-bsd-desktop-2.png` | `2` |
| `ill-10.png` | `10` (not after `1` as a string) |

Ascending numeric order → index 0 = lowest number. Do **not** rely on plain
alphabetical sort. Ties / missing numbers: fall back to `localeCompare` with
`{ numeric: true }`. Use all image files in each folder (png/jpg/jpeg/webp).

- `desktopFeeds` ← `desktop/` images in trailing-number order
- `mobileFeeds` ← `mobile/` images in trailing-number order when present and
  non-empty; else `[]`

### 3. Sync imports + feed consts

- Remove obsolete desktop/mobile feed imports that no longer exist on disk.
- Add imports for new files; camelCase bindings from filenames (match file style).
- Rebuild the desktop feeds const in trailing-number order.
- If mobile images exist: ensure a mobile feeds const (or inline array) and wire it
  in trailing-number order.
- If mobile folder missing/empty: set `mobileFeeds: []` and remove unused mobile-only
  imports/consts.
- Keep collection-frame and any non-feed imports untouched.

### 4. Patch object fields only

```ts
desktopFeeds: {DESKTOP_FEEDS_CONST},
mobileFeeds: {MOBILE_FEEDS_CONST_OR_EMPTY},
```

Leave every other property on the object exactly as it was.

## Do not

- Create a new portfolio object or register a new entry.
- Remeasure or rewrite `desktopFeedAspectRatios` / `aspectRatio`.
- Touch `collectionFrame*` fields or imports.
- Copy desktop feeds into `mobileFeeds` when `mobile/` is empty — use `[]`.
- Reorder relative to trailing filename numbers (before extension).
- Use plain alphabetical order when numbers would disagree (`-10` vs `-2`).
- Edit other companies’ objects while updating one folder.
