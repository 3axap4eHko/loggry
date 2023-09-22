import { strict as assert } from 'node:assert';
import { LogLevel, LOG_EVENT, getObject, defaultErrorOutput, defaultLogger, log } from '../../build/index.js';

assert(typeof LogLevel === 'object');
assert(typeof LOG_EVENT === 'symbol');
assert(typeof getObject === 'function');
assert(typeof defaultErrorOutput === 'function');
assert(typeof defaultLogger === 'function');
assert(typeof log === 'function');

console.log('MJS import test passed');
