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
}

export interface Modifier {
  id: string;
  label: string;
  path: string;
  defaultPosition: Position;
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
