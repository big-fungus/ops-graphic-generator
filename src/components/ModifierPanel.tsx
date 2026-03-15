import { useState } from 'react';
import type { Modifier, Position, SymbolState } from '../types';
import { MODIFIERS } from '../data/modifiers';

interface Props {
  state: SymbolState;
  onAdd: (modifier: Modifier) => void;
  onRemove: (position: Position, index: number) => void;
  onMove: (position: Position, index: number, newPosition: Position) => void;
}

const ALL_POSITIONS: { value: Position; label: string }[] = [
  { value: 'topLeft',     label: 'Top Left' },
  { value: 'topCenter',   label: 'Top Center' },
  { value: 'topRight',    label: 'Top Right' },
  { value: 'centerLeft',  label: 'Center Left' },
  { value: 'center',      label: 'Center' },
  { value: 'centerRight', label: 'Center Right' },
  { value: 'botLeft',     label: 'Bottom Left' },
  { value: 'botCenter',   label: 'Bottom Center' },
  { value: 'botRight',    label: 'Bottom Right' },
];

const POSITION_LABELS: Record<Position, string> = Object.fromEntries(
  ALL_POSITIONS.map(p => [p.value, p.label])
) as Record<Position, string>;

export default function ModifierPanel({ state, onAdd, onRemove, onMove }: Props) {
  const [search, setSearch] = useState('');

  const filtered = MODIFIERS.filter(m =>
    m.label.toLowerCase().includes(search.toLowerCase())
  );

  // Collect all active modifiers with their positions
  const activeEntries = (Object.entries(state.modifiers) as [Position, Modifier[]][])
    .filter(([, mods]) => mods && mods.length > 0);

  return (
    <div className="modifier-panel">
      <h3 className="panel-title">Modifiers</h3>

      {/* Search / add */}
      <div className="modifier-search-section">
        <input
          type="text"
          className="search-input"
          placeholder="Search modifiers..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="modifier-list">
          {filtered.map(mod => (
            <div key={mod.id} className="modifier-list-item">
              <img src={mod.path} alt={mod.label} className="mod-thumb" />
              <span className="mod-name">{mod.label}</span>
              <span className="mod-pos-badge">{POSITION_LABELS[mod.defaultPosition]}</span>
              <button
                className="add-btn"
                onClick={() => onAdd(mod)}
                title={`Add ${mod.label}`}
              >
                + Add
              </button>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="no-results">No modifiers match "{search}"</p>
          )}
        </div>
      </div>

      {/* Active modifiers */}
      {activeEntries.length > 0 && (
        <div className="active-modifiers-section">
          <h4 className="section-subtitle">Active Modifiers</h4>
          {activeEntries.map(([pos, mods]) => (
            <div key={pos} className="active-position-group">
              <span className="active-pos-label">{POSITION_LABELS[pos]}</span>
              {mods.map((mod, idx) => (
                <div key={`${mod.id}-${idx}`} className="active-modifier-item">
                  <img src={mod.path} alt={mod.label} className="mod-thumb-sm" />
                  <span className="mod-name-sm">{mod.label}</span>
                  <select
                    className="pos-select"
                    value={pos}
                    onChange={e => onMove(pos, idx, e.target.value as Position)}
                    title="Move to position"
                  >
                    {ALL_POSITIONS.map(p => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                  <button
                    className="remove-btn"
                    onClick={() => onRemove(pos, idx)}
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
