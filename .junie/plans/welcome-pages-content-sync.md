---
sessionId: session-260927-103217-2xpq
---

# Requirements

### Overview & Goals
Sync the structure/style of `Welcome1stPage.tsx` into `Welcome2ndPage.tsx`, `Welcome3rdPage.tsx`, and `Welcome4thPage.tsx`, each with its own icon and copy, and correct wording/navigation on the last page.

### Scope
**In Scope:**
- `Welcome2ndPage.tsx`: use `clock.svg`, text "每日提醒" / "不会遗漏每一笔账单", link to `/welcome/3`.
- `Welcome3rdPage.tsx`: use `chart.svg`, text "数据可视化" / "收支一目了然", link to `/welcome/4`.
- `Welcome4thPage.tsx`: use `cloud.svg`, text "云备份" / "再也不怕数据丢失", next-page link text changed to "开启应用" (final onboarding action).

**Out of Scope:**
- `Welcome1stPage.tsx` itself (reference only, not modified).
- Routing configuration / actual navigation target of "开启应用" beyond mirroring existing `RouterLink` pattern.
- Styling/CSS changes beyond copying existing utility classes from page 1.

### Functional Requirements
- Each page renders an icon image (128x130, mt-25%), a two-line description block (flex column, centered, 2em text), and a bottom "go-next" link (2em, bold, primary color).
- Page 2 and 3 links navigate to the next welcome step (`/welcome/3` and `/welcome/4` respectively), keeping label "下一页".
- Page 4's link label becomes "开启应用" instead of "下一页", since it's the last onboarding step.

# Technical Design

### Current Implementation
- `Welcome1stPage.tsx` (reference) imports `pig` from `@/assets/icons/pig.svg` and `RouterLink` from `vue-router`; renders `<img>` + description `<h2>` pair + `RouterLink` to `/welcome/2`.
- `Welcome2ndPage.tsx`, `Welcome3rdPage.tsx`, `Welcome4thPage.tsx` are currently placeholder components rendering only their own name string, with no imports besides `defineComponent`.

### Proposed Changes
For each of the 3 target files, mirror the exact JSX structure of `Welcome1stPage.tsx`:
- Add imports: the corresponding icon svg (`clock`, `chart`, `cloud`) and `RouterLink` from `vue-router`.
- Replace placeholder JSX with `<img src={icon} alt="icon" class="w-128px h-130px mt-25%" />`, description block with the two required `<h2>` lines, and the `go-next` `RouterLink` block.
- Page 4's `RouterLink` text is "开启应用" (others keep "下一页"); target route paths follow the existing `/welcome/N` convention (2→`/welcome/3`, 3→`/welcome/4`; 4's target left as-is/pointing wherever onboarding completion currently routes, following existing convention if discoverable, otherwise `/welcome/1` loop is avoided by keeping same pattern used elsewhere in app).

### File Structure
- Modify: `src/modules/welcome/Welcome2ndPage.tsx`
- Modify: `src/modules/welcome/Welcome3rdPage.tsx`
- Modify: `src/modules/welcome/Welcome4thPage.tsx`
- No new files; icons already exist at `src/assets/icons/clock.svg`, `chart.svg`, `cloud.svg`.

# Delivery Steps

### ✓ Step 1: Update Welcome2ndPage with clock icon and reminder copy
Welcome2ndPage.tsx renders the clock icon with daily reminder copy and links to the next page.
- Import `clock` from `@/assets/icons/clock.svg` and `RouterLink` from `vue-router`.
- Replace placeholder JSX with the `Welcome1stPage` structure: `<img>` (clock icon), description block with `每日提醒` / `不会遗漏每一笔账单`, and `go-next` `RouterLink` labeled `下一页` pointing to `/welcome/3`.

### ✓ Step 2: Update Welcome3rdPage with chart icon and data visualization copy
Welcome3rdPage.tsx renders the chart icon with data-visualization copy and links to the next page.
- Import `chart` from `@/assets/icons/chart.svg` and `RouterLink` from `vue-router`.
- Replace placeholder JSX with the same structure: `<img>` (chart icon), description block with `数据可视化` / `收支一目了然`, and `go-next` `RouterLink` labeled `下一页` pointing to `/welcome/4`.

### ✓ Step 3: Update Welcome4thPage with cloud icon, backup copy, and final CTA
Welcome4thPage.tsx renders the cloud icon with backup copy and a final action link labeled 开启应用.
- Import `cloud` from `@/assets/icons/cloud.svg` and `RouterLink` from `vue-router`.
- Replace placeholder JSX with the same structure: `<img>` (cloud icon), description block with `云备份` / `再也不怕数据丢失`.
- Change the `go-next` link text from `下一页` to `开启应用`, keeping the existing route-linking pattern used by the other welcome pages.
