# Ops Graphic Generator

A browser-based tool for composing NATO military map symbols per APP-6 / MIL-STD-2525 standards.

## Features

- **Base symbol selection** — 16 frames across 4 types (Land, Air, Sea, Subsurface) × 4 affiliations (Friendly, Enemy, Neutral, Unknown)
- **Modifier overlays** — 23 tactical modifiers (Infantry, Tracked, Wheeled, Engineer, Recon, etc.) with configurable positioning on a 9-cell grid
- **Unit size indicators** — Team through Corps echelon markers
- **PNG export** — Download the composed symbol as a PNG image

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Build

```bash
npm run build     # type-check + production build → dist/
npm run preview   # serve production build locally
```

## How It Works

The app composites rasterized PNG assets onto an HTML Canvas:

1. A **base frame** is drawn (rectangle, diamond, circle, or quatrefoil depending on affiliation)
2. An optional **size indicator** is placed above the frame
3. **Modifier icons** are scaled and positioned within the frame's interior bounds using per-modifier fill ratios and scale modes based on APP-6 conventions

All assets live in `Ops Graphics/` (served as Vite's public directory).

## Tech Stack

React 18 · TypeScript · Vite 5 · Canvas 2D API

## References

- [APP-6(D) NATO Joint Military Symbology](https://en.wikipedia.org/wiki/NATO_Joint_Military_Symbology)
- [MIL-STD-2525D](https://www.jcs.mil/Portals/36/Documents/Doctrine/Other_Pubs/ms_2525d.pdf)
