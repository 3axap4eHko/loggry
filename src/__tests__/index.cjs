const { strict: assert } = require('node:assert');
const { LOG_EVENT, getObject, defaultErrorOutput, defaultLogger, log, logger } = require('../../build/index.cjs');

assert(typeof LOG_EVENT === 'symbol');
assert(typeof getObject === 'function');
assert(typeof defaultErrorOutput === 'function');
assert(typeof defaultLogger === 'function');
assert(typeof log === 'function');
assert(typeof logger === 'object');

console.log('CJS import test passed');
