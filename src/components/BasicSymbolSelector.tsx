import type { BaseSymbol, SymbolType, Affiliation } from '../types';
import { BASIC_SYMBOLS } from '../data/symbols';

interface Props {
  selected: BaseSymbol;
  onSelect: (symbol: BaseSymbol) => void;
}

const TYPES: SymbolType[] = ['land', 'air', 'sea', 'sub'];
const AFFILIATIONS: Affiliation[] = ['friendly', 'enemy', 'neutral', 'unknown'];

const AFFILIATION_LABELS: Record<Affiliation, string> = {
  friendly: 'Friendly',
  enemy: 'Enemy',
  neutral: 'Neutral',
  unknown: 'Unknown',
};

const TYPE_LABELS: Record<SymbolType, string> = {
  land: 'Land',
  air: 'Air',
  sea: 'Sea',
  sub: 'Sub',
};

export default function BasicSymbolSelector({ selected, onSelect }: Props) {
  return (
    <div className="basic-symbol-selector">
      <h3 className="panel-title">Base Symbol</h3>
      <table className="symbol-grid">
        <thead>
          <tr>
            <th></th>
            {AFFILIATIONS.map(a => (
              <th key={a} className="affiliation-header">{AFFILIATION_LABELS[a]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TYPES.map(type => (
            <tr key={type}>
              <td className="type-label">{TYPE_LABELS[type]}</td>
              {AFFILIATIONS.map(affiliation => {
                const sym = BASIC_SYMBOLS.find(
                  s => s.type === type && s.affiliation === affiliation
                )!;
                const isSelected = sym.id === selected.id;
                return (
                  <td key={affiliation}>
                    <button
                      className={`symbol-btn${isSelected ? ' selected' : ''}`}
                      onClick={() => onSelect(sym)}
                      title={sym.label}
                    >
                      <img src={sym.path} alt={sym.label} className="symbol-thumb" />
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
