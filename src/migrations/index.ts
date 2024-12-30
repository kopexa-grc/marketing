import * as migration_20241229_133815 from './20241229_133815';
import * as migration_20241229_184827 from './20241229_184827';
import * as migration_20241230_001951 from './20241230_001951';

export const migrations = [
  {
    up: migration_20241229_133815.up,
    down: migration_20241229_133815.down,
    name: '20241229_133815',
  },
  {
    up: migration_20241229_184827.up,
    down: migration_20241229_184827.down,
    name: '20241229_184827',
  },
  {
    up: migration_20241230_001951.up,
    down: migration_20241230_001951.down,
    name: '20241230_001951'
  },
];
