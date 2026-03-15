import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import type { SymbolState } from '../types';
import { drawComposite } from '../utils/compositor';

export interface SymbolCanvasHandle {
  getCanvas: () => HTMLCanvasElement | null;
}

interface Props {
  state: SymbolState;
}

const SymbolCanvas = forwardRef<SymbolCanvasHandle, Props>(({ state }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useImperativeHandle(ref, () => ({
    getCanvas: () => canvasRef.current,
  }));

  useEffect(() => {
    if (canvasRef.current) {
      drawComposite(canvasRef.current, state);
    }
  }, [state]);

  return (
    <div className="symbol-canvas-wrapper">
      <canvas ref={canvasRef} className="symbol-canvas" />
    </div>
  );
});

SymbolCanvas.displayName = 'SymbolCanvas';

export default SymbolCanvas;
