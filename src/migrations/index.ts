import * as migration_20250101_171607 from './20250101_171607';
import * as migration_20250101_173915 from './20250101_173915';
import * as migration_20250101_235517 from './20250101_235517';
import * as migration_20250101_235723 from './20250101_235723';

export const migrations = [
  {
    up: migration_20250101_171607.up,
    down: migration_20250101_171607.down,
    name: '20250101_171607',
  },
  {
    up: migration_20250101_173915.up,
    down: migration_20250101_173915.down,
    name: '20250101_173915',
  },
  {
    up: migration_20250101_235517.up,
    down: migration_20250101_235517.down,
    name: '20250101_235517',
  },
  {
    up: migration_20250101_235723.up,
    down: migration_20250101_235723.down,
    name: '20250101_235723'
  },
];
