# LOGGRY

Lightweight 0-dependency, transport agnostic, ESM and CommonJS logger bus for Node.js applications,
enabling structured logging and event handling with customizable listeners and various log levels.

[![Build Status][github-image]][github-url]
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Coverage Status][codecov-image]][codecov-url]
[![Maintainability][codeclimate-image]][codeclimate-url]
[![Snyk][snyk-image]][snyk-url]

## Instalation
PNPM
```bash
pnpm add loggry
```

YARN
```bash
yarn add loggry
```

NPM
```bash
npm install --save loggry
```

## Usage

In the main script
```typescript
import { addListener, LogEvent } from 'loggry';

addListener((log: LogEvent) => console.log(log.level, log.message, 'at', log.timestamp));
```

In some other place
```typescript
import { debug } from 'loggry';

function myFunction() {
  debug('myFunction', 'executed!');
}
```

Built-in log levels
```typescript
enum LogLevel {
  silent,
  fatal,
  error,
  warn,
  info,
  debug,
  trace,
}
```

Pino integration
```typescript
import createPino from 'pino';
import { addListener, LogEvent } from 'loggry';

const pinoLogger = createPino();

addListener(({ level, message, details }: LogEvent) => pinoLogger[level]({ details }, message));
```


## License

License [Apache-2.0](http://www.apache.org/licenses/LICENSE-2.0)
Copyright (c) 2023 Ivan Zakharchanka

[npm-url]: https://www.npmjs.com/package/loggry
[downloads-image]: https://img.shields.io/npm/dw/loggry.svg?maxAge=43200
[npm-image]: https://img.shields.io/npm/v/loggry.svg?maxAge=43200
[github-url]: https://github.com/3axap4eHko/loggry/actions/workflows/cicd.yml
[github-image]: https://github.com/3axap4eHko/loggry/actions/workflows/cicd.yml/badge.svg
[codecov-url]: https://codecov.io/gh/3axap4eHko/loggry
[codecov-image]: https://codecov.io/gh/3axap4eHko/loggry/branch/master/graph/badge.svg?token=JZ8QCGH6PI
[codeclimate-url]: https://codeclimate.com/github/3axap4eHko/loggry/maintainability
[codeclimate-image]: https://api.codeclimate.com/v1/badges/0ba20f27f6db2b0fec8c/maintainability
[snyk-url]: https://snyk.io/test/npm/loggry/latest
[snyk-image]: https://img.shields.io/snyk/vulnerabilities/github/3axap4eHko/loggry.svg?maxAge=43200
