import type { Modifier, Position, ScaleMode } from '../types';

interface ModifierDef {
  id: string;
  label: string;
  folder: string;
  filename: string;
  defaultPosition: Position;
  /** How much of the cell to fill (default 1.0) */
  fillRatio?: number;
  /** 'fit' = contain (default), 'cover' = fill allowing overflow, 'stretch' = ignore aspect ratio */
  scaleMode?: ScaleMode;
}

// Scale factors based on APP-6 / MIL-STD-2525 conventions:
//
// - Infantry (X) and Recon (diagonal slash): stretch corner-to-corner
// - Tracked (oval), Wheeled, Communications: medium fill
// - Motor transport, Radar, Engineer: smaller fill
// - Motorized (thin line): natural size (very narrow source image)
//
const MODIFIER_DEFS: ModifierDef[] = [
  // center/
  { id: 'infantry',                  label: 'Infantry',                    folder: 'center',        filename: 'infantry.png',                         defaultPosition: 'center',     scaleMode: 'stretch', fillRatio: 1.0  },
  { id: 'tracked',                   label: 'Tracked',                     folder: 'center',        filename: 'tracked.png',                          defaultPosition: 'center',     fillRatio: 0.70 },
  { id: 'wheeled',                   label: 'Wheeled',                     folder: 'center',        filename: 'wheeled.png',                          defaultPosition: 'center',     fillRatio: 0.60 },
  { id: 'motorized',                 label: 'Motorized',                   folder: 'center',        filename: 'motorized.png',                        defaultPosition: 'center',     fillRatio: 1.0  },
  { id: 'engineer',                  label: 'Engineer',                    folder: 'center',        filename: 'engineer.png',                         defaultPosition: 'center',     fillRatio: 0.55 },
  { id: 'recon',                     label: 'Reconnaissance',              folder: 'center',        filename: 'recon.png',                            defaultPosition: 'center',     scaleMode: 'stretch', fillRatio: 1.0  },
  { id: 'amphibious',                label: 'Amphibious',                  folder: 'center',        filename: 'amphibious.png',                       defaultPosition: 'center',     fillRatio: 0.80 },
  { id: 'arctic',                    label: 'Arctic',                      folder: 'center',        filename: 'arctic.png',                           defaultPosition: 'center',     fillRatio: 0.65 },
  { id: 'communications',            label: 'Communications',              folder: 'center',        filename: 'communications.png',                   defaultPosition: 'center',     fillRatio: 0.80 },
  { id: 'motor_transport',           label: 'Motor Transport',             folder: 'center',        filename: 'motor_transport.png',                  defaultPosition: 'center',     fillRatio: 0.40 },
  { id: 'radar',                     label: 'Radar',                       folder: 'center',        filename: 'radar.png',                            defaultPosition: 'center',     fillRatio: 0.45 },
  { id: 'riverine',                  label: 'Riverine',                    folder: 'center',        filename: 'riverine.png',                         defaultPosition: 'center',     fillRatio: 0.70 },
  { id: 'sensor',                    label: 'Sensor',                      folder: 'center',        filename: 'sensor.png',                           defaultPosition: 'center',     fillRatio: 0.75 },
  { id: 'air_assault_with_aircraft', label: 'Air Assault (with aircraft)', folder: 'center',        filename: 'air_assault_with_aircraft.png',         defaultPosition: 'center',     fillRatio: 0.55 },

  // center left/
  { id: 'gun_system',                label: 'Gun System',                  folder: 'center left',   filename: 'gun_sytem.png',                        defaultPosition: 'centerLeft' },

  // top center/
  { id: 'air_assault',               label: 'Air Assault',                 folder: 'top center',    filename: 'air_assault.png',                      defaultPosition: 'topCenter' },
  { id: 'bicycle_equipped',          label: 'Bicycle Equipped',            folder: 'top center',    filename: 'bicycle_equipped.png',                 defaultPosition: 'topCenter' },
  { id: 'naval',                     label: 'Naval',                       folder: 'top center',    filename: 'naval.png',                            defaultPosition: 'topCenter' },
  { id: 'ski',                       label: 'Ski',                         folder: 'top center',    filename: 'ski.png',                              defaultPosition: 'topCenter' },

  // bottom center/
  { id: 'airborne',                  label: 'Airborne',                    folder: 'bottom center', filename: 'airborne.png',                         defaultPosition: 'botCenter' },
  { id: 'mountain',                  label: 'Mountain',                    folder: 'bottom center', filename: 'mountain.png',                         defaultPosition: 'botCenter' },
  { id: 'supply',                    label: 'Supply',                      folder: 'bottom center', filename: 'supply.png',                           defaultPosition: 'botCenter' },
  { id: 'air_assault_org_lift',      label: 'Air Assault (org lift)',      folder: 'bottom center', filename: 'air_assault_with_org_lift.png',         defaultPosition: 'botCenter' },
];

export const MODIFIERS: Modifier[] = MODIFIER_DEFS.map(d => ({
  id: d.id,
  label: d.label,
  path: `/unit_symbol_modifiers/${d.folder}/${d.filename}`,
  defaultPosition: d.defaultPosition,
  fillRatio: d.fillRatio,
  scaleMode: d.scaleMode,
}));
