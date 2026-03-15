import type { Modifier, Position } from '../types';

interface ModifierDef {
  id: string;
  label: string;
  folder: string;
  filename: string;
  defaultPosition: Position;
}

const MODIFIER_DEFS: ModifierDef[] = [
  // center/
  { id: 'infantry',                  label: 'Infantry',                    folder: 'center',        filename: 'infantry.png',                         defaultPosition: 'center' },
  { id: 'tracked',                   label: 'Tracked',                     folder: 'center',        filename: 'tracked.png',                          defaultPosition: 'center' },
  { id: 'wheeled',                   label: 'Wheeled',                     folder: 'center',        filename: 'wheeled.png',                          defaultPosition: 'center' },
  { id: 'motorized',                 label: 'Motorized',                   folder: 'center',        filename: 'motorized.png',                        defaultPosition: 'center' },
  { id: 'engineer',                  label: 'Engineer',                    folder: 'center',        filename: 'engineer.png',                         defaultPosition: 'center' },
  { id: 'recon',                     label: 'Reconnaissance',              folder: 'center',        filename: 'recon.png',                            defaultPosition: 'center' },
  { id: 'amphibious',                label: 'Amphibious',                  folder: 'center',        filename: 'amphibious.png',                       defaultPosition: 'center' },
  { id: 'arctic',                    label: 'Arctic',                      folder: 'center',        filename: 'arctic.png',                           defaultPosition: 'center' },
  { id: 'communications',            label: 'Communications',              folder: 'center',        filename: 'communications.png',                   defaultPosition: 'center' },
  { id: 'motor_transport',           label: 'Motor Transport',             folder: 'center',        filename: 'motor_transport.png',                  defaultPosition: 'center' },
  { id: 'radar',                     label: 'Radar',                       folder: 'center',        filename: 'radar.png',                            defaultPosition: 'center' },
  { id: 'riverine',                  label: 'Riverine',                    folder: 'center',        filename: 'riverine.png',                         defaultPosition: 'center' },
  { id: 'sensor',                    label: 'Sensor',                      folder: 'center',        filename: 'sensor.png',                           defaultPosition: 'center' },
  { id: 'air_assault_with_aircraft', label: 'Air Assault (with aircraft)', folder: 'center',        filename: 'air_assault_with_aircraft.png',         defaultPosition: 'center' },

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
}));
