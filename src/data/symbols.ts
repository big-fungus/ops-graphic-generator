import type { BaseSymbol, InnerBounds } from '../types';

// Inner bounds define the usable interior area where modifiers are composited.
// Values are approximate based on visual inspection of the PNG frames.
const INNER_BOUNDS: Record<string, InnerBounds> = {
  land: { x: 8,  y: 8,  w: 191, h: 126 }, // 207×142 rectangle frame
  air:  { x: 15, y: 15, w: 125, h: 134 }, // 155×164 circle/diamond frame
  sea:  { x: 15, y: 20, w: 161, h: 151 }, // 191×191 surface ship silhouette
  sub:  { x: 15, y: 20, w: 125, h: 124 }, // 155×164 submarine silhouette
};

// Dimensions measured from actual PNGs
const DIMS: Record<string, { width: number; height: number }> = {
  land: { width: 207, height: 142 },
  air:  { width: 155, height: 164 },
  sea:  { width: 191, height: 191 },
  sub:  { width: 155, height: 164 },
};

function makeSymbol(
  type: 'land' | 'air' | 'sea' | 'sub',
  affiliation: 'friendly' | 'enemy' | 'neutral' | 'unknown'
): BaseSymbol {
  return {
    id: `${type}_${affiliation}`,
    label: `${affiliation.charAt(0).toUpperCase() + affiliation.slice(1)} ${type.charAt(0).toUpperCase() + type.slice(1)}`,
    type,
    affiliation,
    path: `/basic_symbols/${type}_${affiliation}.png`,
    width: DIMS[type].width,
    height: DIMS[type].height,
    innerBounds: INNER_BOUNDS[type],
  };
}

const TYPES = ['land', 'air', 'sea', 'sub'] as const;
const AFFILIATIONS = ['friendly', 'enemy', 'neutral', 'unknown'] as const;

export const BASIC_SYMBOLS: BaseSymbol[] = TYPES.flatMap(t =>
  AFFILIATIONS.map(a => makeSymbol(t, a))
);

export const DEFAULT_SYMBOL: BaseSymbol = BASIC_SYMBOLS.find(
  s => s.id === 'land_friendly'
)!;
