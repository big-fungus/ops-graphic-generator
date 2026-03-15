import { exportToPNG } from '../utils/compositor';

interface Props {
  getCanvas: () => HTMLCanvasElement | null;
}

export default function ExportButton({ getCanvas }: Props) {
  const handleExport = () => {
    const canvas = getCanvas();
    if (!canvas) return;
    exportToPNG(canvas, 'ops-symbol.png');
  };

  return (
    <button className="export-btn" onClick={handleExport}>
      Export PNG
    </button>
  );
}
