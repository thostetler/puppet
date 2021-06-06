import { run } from './scripts/microcenter';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

run();
