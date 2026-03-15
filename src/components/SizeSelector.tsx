import type { SizeIndicator } from '../types';
import { SIZE_INDICATORS } from '../data/sizes';

interface Props {
  selected: SizeIndicator | null;
  onSelect: (size: SizeIndicator | null) => void;
}

export default function SizeSelector({ selected, onSelect }: Props) {
  return (
    <div className="size-selector">
      <h3 className="panel-title">Unit Size</h3>
      <div className="size-strip">
        <button
          className={`size-btn none-btn${selected === null ? ' selected' : ''}`}
          onClick={() => onSelect(null)}
          title="No size indicator"
        >
          None
        </button>
        {SIZE_INDICATORS.map(size => (
          <button
            key={size.id}
            className={`size-btn${selected?.id === size.id ? ' selected' : ''}`}
            onClick={() => onSelect(selected?.id === size.id ? null : size)}
            title={size.label}
          >
            <img src={size.path} alt={size.label} className="size-thumb" />
            <span className="size-label">{size.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
