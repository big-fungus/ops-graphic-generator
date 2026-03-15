import type { SymbolState, InnerBounds, Position, ScaleMode } from '../types';

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

// Cell sizing rules:
//   'center'      → full inner bounds (spans the entire symbol interior)
//   top/bot rows  → full inner width, one-third inner height
//   left/right cols → one-third inner width, full inner height
//   corner cells  → one-third of each dimension
//
// Multiple modifiers at the same position are drawn at the same cell size,
// layered on top of one another (not subdivided).
function getCell(position: Position, bounds: InnerBounds): Cell {
  const { x, y, w, h } = bounds;
  const col3 = w / 3;
  const row3 = h / 3;

  switch (position) {
    // Full inner bounds
    case 'center':
      return { cx: x + w / 2,      cy: y + h / 2,       w,         h        };

    // Top row — full width, top third height
    case 'topCenter':
      return { cx: x + w / 2,      cy: y + row3 / 2,    w,         h: row3  };
    case 'topLeft':
      return { cx: x + col3 / 2,   cy: y + row3 / 2,    w: col3,   h: row3  };
    case 'topRight':
      return { cx: x + w - col3/2, cy: y + row3 / 2,    w: col3,   h: row3  };

    // Middle row — full height, side third width
    case 'centerLeft':
      return { cx: x + col3 / 2,   cy: y + h / 2,       w: col3,   h        };
    case 'centerRight':
      return { cx: x + w - col3/2, cy: y + h / 2,       w: col3,   h        };

    // Bottom row — full width, bottom third height
    case 'botCenter':
      return { cx: x + w / 2,      cy: y + h - row3/2,  w,         h: row3  };
    case 'botLeft':
      return { cx: x + col3 / 2,   cy: y + h - row3/2,  w: col3,   h: row3  };
    case 'botRight':
      return { cx: x + w - col3/2, cy: y + h - row3/2,  w: col3,   h: row3  };
  }
}

function scaleModifier(
  imgW: number,
  imgH: number,
  cellW: number,
  cellH: number,
  fillRatio: number = 1.0,
  scaleMode: ScaleMode = 'fit'
): { w: number; h: number } {
  // Apply fill ratio — shrinks the available cell space
  const maxW = cellW * fillRatio;
  const maxH = cellH * fillRatio;

  if (scaleMode === 'stretch') {
    // Stretch to fill the cell (ignores aspect ratio)
    return { w: maxW, h: maxH };
  }

  if (scaleMode === 'cover') {
    // Scale up to cover the entire cell (may overflow)
    const scale = Math.max(maxW / imgW, maxH / imgH);
    return { w: imgW * scale, h: imgH * scale };
  }

  // Default: 'fit' — contain within the cell, preserving aspect ratio
  const scale = Math.min(maxW / imgW, maxH / imgH);
  return { w: imgW * scale, h: imgH * scale };
}

/**
 * Shrink innerBounds inward by shapePadding factor.
 * shapePadding of 0.15 means shrink each side by 15% of that dimension.
 */
function applyShapePadding(bounds: InnerBounds, padding: number): InnerBounds {
  if (!padding) return bounds;
  const dx = bounds.w * padding;
  const dy = bounds.h * padding;
  return {
    x: bounds.x + dx,
    y: bounds.y + dy,
    w: bounds.w - 2 * dx,
    h: bounds.h - 2 * dy,
  };
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

  // White background is required: source PNGs are 1-bit/colormap (no true
  // transparency) so compositing without a background produces a black canvas.
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw size indicator centered above the base symbol
  if (sizeImg) {
    const x = (base.width - sizeImg.width) / 2;
    ctx.drawImage(sizeImg, x, 0);
  }

  // Draw base symbol (offset down by topPadding)
  ctx.drawImage(base, 0, topPadding);

  // Draw modifiers
  const rawBounds = state.baseSymbol.innerBounds;
  const shapePad = state.baseSymbol.shapePadding ?? 0;
  const paddedBounds = applyShapePadding(rawBounds, shapePad);
  const offsetBounds: InnerBounds = { ...paddedBounds, y: paddedBounds.y + topPadding };

  for (const [pos, mods] of Object.entries(state.modifiers) as [Position, typeof state.modifiers[Position]][]) {
    if (!mods || mods.length === 0) continue;
    const cell = getCell(pos, offsetBounds);

    for (const mod of mods) {
      const img = await loadImage(mod.path);
      const { w, h } = scaleModifier(
        img.width, img.height,
        cell.w, cell.h,
        mod.fillRatio ?? 1.0,
        mod.scaleMode ?? 'fit'
      );
      ctx.drawImage(img, cell.cx - w / 2, cell.cy - h / 2, w, h);
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
