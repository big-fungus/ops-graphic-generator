import type { BaseSymbol } from '../types';

// Exact dimensions measured from PNGs via `file` command.
// Inner bounds define the usable interior for modifier placement.
// These are calibrated estimates; adjust via visual inspection if needed.
//
// Shape guide by affiliation (NATO):
//   friendly  = rectangle / circle / ship silhouette / sub silhouette
//   enemy     = diamond (rotated square) → inner area is inscribed square
//   neutral   = rectangle/circle (similar to friendly)
//   unknown   = open/question shape

export const BASIC_SYMBOLS: BaseSymbol[] = [
  // ── Land ─────────────────────────────────────────────────────────────────
  {
    id: 'land_friendly',
    label: 'Friendly Land',
    type: 'land', affiliation: 'friendly',
    path: '/basic_symbols/land_friendly.png',
    width: 207, height: 142,
    innerBounds: { x: 9, y: 9, w: 189, h: 124 },
    shapePadding: 0,
  },
  {
    id: 'land_enemy',
    label: 'Enemy Land',
    type: 'land', affiliation: 'enemy',
    path: '/basic_symbols/land_enemy.png',
    width: 202, height: 201,
    // Diamond shape: usable inscribed square centered at (101, 100)
    innerBounds: { x: 36, y: 36, w: 130, h: 129 },
    shapePadding: 0.08,
  },
  {
    id: 'land_neutral',
    label: 'Neutral Land',
    type: 'land', affiliation: 'neutral',
    path: '/basic_symbols/land_neutral.png',
    width: 155, height: 155,
    innerBounds: { x: 9, y: 9, w: 137, h: 137 },
    shapePadding: 0,
  },
  {
    id: 'land_unknown',
    label: 'Unknown Land',
    type: 'land', affiliation: 'unknown',
    path: '/basic_symbols/land_unknown.png',
    width: 202, height: 202,
    innerBounds: { x: 10, y: 10, w: 182, h: 182 },
    shapePadding: 0.15,
  },

  // ── Air ──────────────────────────────────────────────────────────────────
  {
    id: 'air_friendly',
    label: 'Friendly Air',
    type: 'air', affiliation: 'friendly',
    path: '/basic_symbols/air_friendly.png',
    width: 155, height: 164,
    // Circle frame — inscribed square needs padding
    innerBounds: { x: 12, y: 12, w: 131, h: 131 },
    shapePadding: 0.15,
  },
  {
    id: 'air_enemy',
    label: 'Enemy Air',
    type: 'air', affiliation: 'enemy',
    path: '/basic_symbols/air_enemy.png',
    width: 155, height: 146,
    // Diamond: inscribed square
    innerBounds: { x: 28, y: 23, w: 99, h: 100 },
    shapePadding: 0.08,
  },
  {
    id: 'air_neutral',
    label: 'Neutral Air',
    type: 'air', affiliation: 'neutral',
    path: '/basic_symbols/air_neutral.png',
    width: 154, height: 163,
    innerBounds: { x: 12, y: 12, w: 130, h: 139 },
    shapePadding: 0,
  },
  {
    id: 'air_unknown',
    label: 'Unknown Air',
    type: 'air', affiliation: 'unknown',
    path: '/basic_symbols/air_unknown.png',
    width: 207, height: 159,
    innerBounds: { x: 12, y: 12, w: 183, h: 135 },
    shapePadding: 0.18,
  },

  // ── Sea ──────────────────────────────────────────────────────────────────
  {
    id: 'sea_friendly',
    label: 'Friendly Sea',
    type: 'sea', affiliation: 'friendly',
    path: '/basic_symbols/sea_friendly.png',
    width: 191, height: 191,
    innerBounds: { x: 18, y: 18, w: 155, h: 155 },
    shapePadding: 0.15,
  },
  {
    id: 'sea_enemy',
    label: 'Enemy Sea',
    type: 'sea', affiliation: 'enemy',
    path: '/basic_symbols/sea_enemy.png',
    width: 201, height: 201,
    // Diamond
    innerBounds: { x: 36, y: 36, w: 129, h: 129 },
    shapePadding: 0.08,
  },
  {
    id: 'sea_neutral',
    label: 'Neutral Sea',
    type: 'sea', affiliation: 'neutral',
    path: '/basic_symbols/sea_neutral.png',
    width: 155, height: 155,
    innerBounds: { x: 10, y: 10, w: 135, h: 135 },
    shapePadding: 0,
  },
  {
    id: 'sea_unknown',
    label: 'Unknown Sea',
    type: 'sea', affiliation: 'unknown',
    path: '/basic_symbols/sea_unknown.png',
    width: 201, height: 202,
    innerBounds: { x: 15, y: 15, w: 171, h: 172 },
    shapePadding: 0.18,
  },

  // ── Subsurface ────────────────────────────────────────────────────────────
  {
    id: 'sub_friendly',
    label: 'Friendly Sub',
    type: 'sub', affiliation: 'friendly',
    path: '/basic_symbols/sub_friendly.png',
    width: 155, height: 164,
    innerBounds: { x: 14, y: 20, w: 127, h: 124 },
    shapePadding: 0.12,
  },
  {
    id: 'sub_enemy',
    label: 'Enemy Sub',
    type: 'sub', affiliation: 'enemy',
    path: '/basic_symbols/sub_enemy.png',
    width: 155, height: 150,
    innerBounds: { x: 14, y: 15, w: 127, h: 120 },
    shapePadding: 0.12,
  },
  {
    id: 'sub_neutral',
    label: 'Neutral Sub',
    type: 'sub', affiliation: 'neutral',
    path: '/basic_symbols/sub_neutral.png',
    width: 155, height: 163,
    innerBounds: { x: 14, y: 20, w: 127, h: 123 },
    shapePadding: 0.12,
  },
  {
    id: 'sub_unknown',
    label: 'Unknown Sub',
    type: 'sub', affiliation: 'unknown',
    path: '/basic_symbols/sub_unknown.png',
    width: 208, height: 159,
    innerBounds: { x: 18, y: 15, w: 172, h: 129 },
    shapePadding: 0.18,
  },
];

export const DEFAULT_SYMBOL = BASIC_SYMBOLS.find(s => s.id === 'land_friendly')!;
