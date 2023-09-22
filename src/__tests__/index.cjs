const { strict: assert } = require('node:assert');
const { LogLevel, LOG_EVENT, getObject, defaultErrorOutput, defaultLogger, log } = require('../../build/index.cjs');

assert(typeof LogLevel === 'object');
assert(typeof LOG_EVENT === 'symbol');
assert(typeof getObject === 'function');
assert(typeof defaultErrorOutput === 'function');
assert(typeof defaultLogger === 'function');
assert(typeof log === 'function');

console.log('CJS import test passed');
