import { strict as assert } from 'node:assert';
import { LOG_EVENT, getObject, defaultErrorOutput, defaultLogger, log, logger } from '../../build/index.js';

assert(typeof LOG_EVENT === 'symbol');
assert(typeof getObject === 'function');
assert(typeof defaultErrorOutput === 'function');
assert(typeof defaultLogger === 'function');
assert(typeof log === 'function');
assert(typeof logger === 'object');

console.log('MJS import test passed');
