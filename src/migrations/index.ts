import * as migration_20250101_171607 from './20250101_171607';
import * as migration_20250101_173915 from './20250101_173915';
import * as migration_20250101_235517 from './20250101_235517';
import * as migration_20250101_235723 from './20250101_235723';
import * as migration_20250102_104528 from './20250102_104528';
import * as migration_20250102_124124 from './20250102_124124';
import * as migration_20250102_135232 from './20250102_135232';
import * as migration_20250102_142237 from './20250102_142237';
import * as migration_20250102_145401 from './20250102_145401';
import * as migration_20250102_153022 from './20250102_153022';

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
    name: '20250101_235723',
  },
  {
    up: migration_20250102_104528.up,
    down: migration_20250102_104528.down,
    name: '20250102_104528',
  },
  {
    up: migration_20250102_124124.up,
    down: migration_20250102_124124.down,
    name: '20250102_124124',
  },
  {
    up: migration_20250102_135232.up,
    down: migration_20250102_135232.down,
    name: '20250102_135232',
  },
  {
    up: migration_20250102_142237.up,
    down: migration_20250102_142237.down,
    name: '20250102_142237',
  },
  {
    up: migration_20250102_145401.up,
    down: migration_20250102_145401.down,
    name: '20250102_145401',
  },
  {
    up: migration_20250102_153022.up,
    down: migration_20250102_153022.down,
    name: '20250102_153022'
  },
];
