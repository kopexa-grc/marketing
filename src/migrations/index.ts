import * as migration_20250101_171607 from './20250101_171607';
import * as migration_20250101_173915 from './20250101_173915';

export const migrations = [
  {
    up: migration_20250101_171607.up,
    down: migration_20250101_171607.down,
    name: '20250101_171607',
  },
  {
    up: migration_20250101_173915.up,
    down: migration_20250101_173915.down,
    name: '20250101_173915'
  },
];
