import * as migration_20250101_171607 from './20250101_171607';

export const migrations = [
  {
    up: migration_20250101_171607.up,
    down: migration_20250101_171607.down,
    name: '20250101_171607'
  },
];
