import { useState, useRef, useCallback, type ReactNode } from 'react';
import type { SymbolState, BaseSymbol, SizeIndicator, Modifier, Position } from './types';
import { DEFAULT_SYMBOL } from './data/symbols';
import SymbolCanvas, { type SymbolCanvasHandle } from './components/SymbolCanvas';
import BasicSymbolSelector from './components/BasicSymbolSelector';
import SizeSelector from './components/SizeSelector';
import ModifierPanel from './components/ModifierPanel';
import ExportButton from './components/ExportButton';
import './App.css';

const INITIAL_STATE: SymbolState = {
  baseSymbol: DEFAULT_SYMBOL,
  sizeIndicator: null,
  modifiers: {},
};

type Tab = 'symbol' | 'preview' | 'modifiers';

function TabBar({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  const tabs: { id: Tab; label: string; icon: ReactNode }[] = [
    { id: 'symbol',    label: 'Symbol',    icon: '⊞' },
    { id: 'preview',   label: 'Preview',   icon: '◎' },
    { id: 'modifiers', label: 'Modifiers', icon: '☰' },
  ];
  return (
    <nav className="mobile-tab-bar" aria-label="Navigation">
      {tabs.map(t => (
        <button
          key={t.id}
          className={`tab-btn${active === t.id ? ' active' : ''}`}
          onClick={() => onChange(t.id)}
        >
          <span className="tab-icon" aria-hidden="true">{t.icon}</span>
          <span className="tab-label">{t.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default function App() {
  const [state, setState] = useState<SymbolState>(INITIAL_STATE);
  const canvasRef = useRef<SymbolCanvasHandle>(null);
  const [activeTab, setActiveTab] = useState<Tab>('preview');

  const handleBaseSymbolSelect = useCallback((symbol: BaseSymbol) => {
    setState(prev => ({ ...prev, baseSymbol: symbol }));
  }, []);

  const handleSizeSelect = useCallback((size: SizeIndicator | null) => {
    setState(prev => ({ ...prev, sizeIndicator: size }));
  }, []);

  const handleAddModifier = useCallback((modifier: Modifier) => {
    setState(prev => {
      const pos = modifier.defaultPosition;
      const existing = prev.modifiers[pos] ?? [];
      return {
        ...prev,
        modifiers: { ...prev.modifiers, [pos]: [...existing, modifier] },
      };
    });
  }, []);

  const handleRemoveModifier = useCallback((position: Position, index: number) => {
    setState(prev => {
      const existing = [...(prev.modifiers[position] ?? [])];
      existing.splice(index, 1);
      const next = { ...prev.modifiers };
      if (existing.length === 0) {
        delete next[position];
      } else {
        next[position] = existing;
      }
      return { ...prev, modifiers: next };
    });
  }, []);

  const handleMoveModifier = useCallback((
    fromPos: Position,
    index: number,
    toPos: Position
  ) => {
    if (fromPos === toPos) return;
    setState(prev => {
      const fromList = [...(prev.modifiers[fromPos] ?? [])];
      const [mod] = fromList.splice(index, 1);
      const toList = [...(prev.modifiers[toPos] ?? []), mod];
      const next = { ...prev.modifiers };
      if (fromList.length === 0) delete next[fromPos];
      else next[fromPos] = fromList;
      next[toPos] = toList;
      return { ...prev, modifiers: next };
    });
  }, []);

  const getCanvas = useCallback(() => canvasRef.current?.getCanvas() ?? null, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Ops Graphic Generator</h1>
        <ExportButton getCanvas={getCanvas} />
      </header>

      <div className="app-body">
        {/* Left column: base symbol selector + unit size */}
        <aside className={`panel left-panel${activeTab !== 'symbol' ? ' tab-hidden' : ''}`}>
          <BasicSymbolSelector
            selected={state.baseSymbol}
            onSelect={handleBaseSymbolSelect}
          />
          <SizeSelector
            selected={state.sizeIndicator}
            onSelect={handleSizeSelect}
          />
        </aside>

        {/* Center column: canvas preview */}
        <main className={`center-column${activeTab !== 'preview' ? ' tab-hidden' : ''}`}>
          <div className="canvas-area">
            <SymbolCanvas ref={canvasRef} state={state} />
          </div>
        </main>

        {/* Right column: modifier panel */}
        <aside className={`panel right-panel${activeTab !== 'modifiers' ? ' tab-hidden' : ''}`}>
          <ModifierPanel
            state={state}
            onAdd={handleAddModifier}
            onRemove={handleRemoveModifier}
            onMove={handleMoveModifier}
          />
        </aside>
      </div>

      <TabBar active={activeTab} onChange={setActiveTab} />
    </div>
  );
}
