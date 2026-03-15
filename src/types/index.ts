export type SymbolType = 'land' | 'air' | 'sea' | 'sub';
export type Affiliation = 'friendly' | 'enemy' | 'neutral' | 'unknown';

export type Position =
  | 'topLeft' | 'topCenter' | 'topRight'
  | 'centerLeft' | 'center' | 'centerRight'
  | 'botLeft' | 'botCenter' | 'botRight';

export interface InnerBounds {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** How a modifier should be scaled within its cell */
export type ScaleMode = 'fit' | 'cover' | 'stretch';

export interface BaseSymbol {
  id: string;
  label: string;
  type: SymbolType;
  affiliation: Affiliation;
  path: string;
  /** Pixel dimensions of the PNG */
  width: number;
  height: number;
  /** The active interior area where modifiers are placed */
  innerBounds: InnerBounds;
  /**
   * Extra inward padding factor (0–1) for non-rectangular frames.
   * Shrinks the effective innerBounds so modifiers stay within curved borders.
   * 0 = no extra padding (rectangles), ~0.12 = circles, ~0.15 = cloud shapes.
   */
  shapePadding?: number;
}

export interface Modifier {
  id: string;
  label: string;
  path: string;
  defaultPosition: Position;
  /** Fraction of the cell the modifier should fill (default 1.0) */
  fillRatio?: number;
  /** How to scale: 'fit' = contain, 'cover' = fill (may clip), 'stretch' = ignore aspect ratio */
  scaleMode?: ScaleMode;
}

export interface SizeIndicator {
  id: string;
  label: string;
  path: string;
}

export interface SymbolState {
  baseSymbol: BaseSymbol;
  sizeIndicator: SizeIndicator | null;
  modifiers: Partial<Record<Position, Modifier[]>>;
}
