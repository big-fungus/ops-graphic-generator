import type { SymbolState, InnerBounds, Position } from '../types';

// ---------------------------------------------------------------------------
// Image loading (cached)
// ---------------------------------------------------------------------------

const imageCache = new Map<string, HTMLImageElement>();

export function loadImage(src: string): Promise<HTMLImageElement> {
  if (imageCache.has(src)) {
    return Promise.resolve(imageCache.get(src)!);
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

// ---------------------------------------------------------------------------
// Position grid math
// ---------------------------------------------------------------------------

interface Cell {
  cx: number;
  cy: number;
  w: number;
  h: number;
}

function getCell(position: Position, bounds: InnerBounds): Cell {
  const colW = bounds.w / 3;
  const rowH = bounds.h / 3;

  const colMap: Record<string, number> = {
    Left: 0, Center: 1, Right: 2,
    center: 1,
  };
  const rowMap: Record<string, number> = {
    top: 0, center: 1, bot: 2,
  };

  let col: number;
  let row: number;

  if (position === 'center') {
    col = 1; row = 1;
  } else {
    // e.g. 'topLeft', 'botCenter', 'centerRight'
    const match = position.match(/^(top|center|bot)(Left|Center|Right)$/);
    if (!match) { col = 1; row = 1; }
    else {
      row = rowMap[match[1]];
      col = colMap[match[2]];
    }
  }

  return {
    cx: bounds.x + col * colW + colW / 2,
    cy: bounds.y + row * rowH + rowH / 2,
    w: colW,
    h: rowH,
  };
}

function scaleToFit(
  imgW: number,
  imgH: number,
  maxW: number,
  maxH: number
): { w: number; h: number } {
  const scale = Math.min(maxW / imgW, maxH / imgH, 1);
  return { w: imgW * scale, h: imgH * scale };
}

// ---------------------------------------------------------------------------
// Main composite draw
// ---------------------------------------------------------------------------

export async function drawComposite(
  canvas: HTMLCanvasElement,
  state: SymbolState
): Promise<void> {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const base = await loadImage(state.baseSymbol.path);

  // Determine extra space needed above for size indicator
  let sizeImg: HTMLImageElement | null = null;
  let topPadding = 0;
  if (state.sizeIndicator) {
    sizeImg = await loadImage(state.sizeIndicator.path);
    topPadding = sizeImg.height + 6;
  }

  // Resize canvas
  canvas.width = base.width;
  canvas.height = base.height + topPadding;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw size indicator centered above the base symbol
  if (sizeImg) {
    const x = (base.width - sizeImg.width) / 2;
    ctx.drawImage(sizeImg, x, 0);
  }

  // Draw base symbol (offset down by topPadding)
  ctx.drawImage(base, 0, topPadding);

  // Draw modifiers
  const bounds = state.baseSymbol.innerBounds;
  const offsetBounds: InnerBounds = { ...bounds, y: bounds.y + topPadding };

  for (const [pos, mods] of Object.entries(state.modifiers) as [Position, typeof state.modifiers[Position]][]) {
    if (!mods || mods.length === 0) continue;
    const cell = getCell(pos, offsetBounds);

    // Stack multiple modifiers: divide the cell height among them
    const slotH = cell.h / mods.length;

    for (let i = 0; i < mods.length; i++) {
      const mod = mods[i];
      const img = await loadImage(mod.path);
      const slotCy = cell.cy - cell.h / 2 + slotH * i + slotH / 2;
      const { w, h } = scaleToFit(img.width, img.height, cell.w * 0.85, slotH * 0.85);
      ctx.drawImage(img, cell.cx - w / 2, slotCy - h / 2, w, h);
    }
  }
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export function exportToPNG(canvas: HTMLCanvasElement, filename = 'symbol.png'): void {
  const url = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
}
