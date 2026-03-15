# Ops Graphic Generator — AI Context

## What This Is

A browser-based NATO military symbol composer (APP-6 / MIL-STD-2525). Users pick a base frame, add modifier icons, select unit size, and export a composite PNG.

## Tech Stack

- React 18 + TypeScript + Vite 5
- Canvas 2D API for rendering (no SVG)
- All assets are rasterized PNGs in `Ops Graphics/` (Vite `publicDir`)
- No backend, no router, no state library — pure `useState` in `App.tsx`

## Commands

- `npm run dev` — start dev server
- `npm run build` — type-check + production build
- `npm run preview` — serve production build
- No test framework is configured

## Project Structure

```
src/
  types/index.ts        — All TypeScript interfaces (BaseSymbol, Modifier, SymbolState, etc.)
  data/symbols.ts       — 16 base symbol definitions with innerBounds + shapePadding
  data/modifiers.ts     — 23 modifier definitions with fillRatio + scaleMode
  data/sizes.ts         — 10 unit size indicator definitions
  utils/compositor.ts   — Core rendering: image loading, position grid, scaling, canvas drawing
  components/
    SymbolCanvas.tsx     — Canvas wrapper, calls drawComposite() on state change
    BasicSymbolSelector  — 4×4 grid (type × affiliation) for picking base frame
    ModifierPanel.tsx    — Search, add, remove, reposition modifiers
    SizeSelector.tsx     — Unit size picker (Team → Corps)
    ExportButton.tsx     — PNG export via canvas.toDataURL()
  App.tsx               — Root component, holds SymbolState, wires callbacks
  App.css               — All styles (single file)

Ops Graphics/            — Static PNG assets (Vite publicDir)
  basic_symbols/         — 16 base frame PNGs (land/air/sea/sub × friendly/enemy/neutral/unknown)
  unit_symbol_modifiers/ — 23 modifier PNGs organized by position folder
  size_indicator/        — 10 unit size PNGs
```

## Architecture: How Rendering Works

1. **SymbolState** holds: `baseSymbol`, `sizeIndicator`, `modifiers` (keyed by Position)
2. **compositor.ts** `drawComposite()` layers PNGs onto a canvas:
   - Size indicator centered above base symbol (with 6px gap)
   - Base symbol drawn at (0, topPadding)
   - Modifiers drawn in their position cells within the base's `innerBounds`
3. **Position grid**: 9-cell grid (3×3) mapped to `innerBounds`:
   - `center` = full bounds, edges = 1/3 slices
   - Multiple modifiers at same position stack (no subdivision)
4. **Modifier scaling** uses three modes:
   - `fit` (default): preserve aspect ratio, contain within cell × fillRatio
   - `stretch`: ignore aspect ratio, fill cell × fillRatio (used by infantry X, recon slash)
   - `cover`: preserve aspect ratio, fill cell (may overflow)
5. **shapePadding** on base symbols shrinks effective bounds for non-rectangular frames (circles, diamonds, cloud shapes) so modifiers don't exceed visible borders

## Key Domain Concepts

- **Affiliation** determines frame shape: friendly=rectangle, enemy=diamond, neutral=square, unknown=quatrefoil/cloud
- **innerBounds** = the pixel rectangle inside the frame where modifiers go. Already accounts for border thickness. For diamonds, this is the inscribed square.
- **shapePadding** = additional fractional inset for curved/irregular frames (0 for rectangles, 0.08-0.18 for others)
- **fillRatio** = per-modifier scale (0.40 for small icons like motor_transport, 1.0 for full-frame icons like infantry)
- **scaleMode** = per-modifier stretch behavior (`stretch` for corner-to-corner icons per APP-6 standard)
- Source PNGs are mixed bit-depth (1-bit, 4-bit, 8-bit colormap, RGBA). White background fill is required before compositing.

## Common Tasks

**Adding a new modifier**: Add entry to `MODIFIER_DEFS` in `src/data/modifiers.ts`, place PNG in `Ops Graphics/unit_symbol_modifiers/<position>/`. Set appropriate `fillRatio` and `scaleMode`.

**Adding a new base symbol**: Add entry to `BASIC_SYMBOLS` in `src/data/symbols.ts` with measured `innerBounds` and appropriate `shapePadding`. Place PNG in `Ops Graphics/basic_symbols/`.

**Adjusting modifier sizing**: Change `fillRatio` (0-1) in `src/data/modifiers.ts`. For frame-filling icons use `scaleMode: 'stretch'`.

**Adjusting frame padding**: Change `shapePadding` (0-0.2) in `src/data/symbols.ts`.
