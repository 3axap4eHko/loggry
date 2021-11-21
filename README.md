# LOGGRY

Lightweight NodeJS logger bus

[![Build Status][github-image]][github-url]
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Coverage Status][codecov-image]][codecov-url]
[![Maintainability][codeclimate-image]][codeclimate-url]
[![Snyk][snyk-image]][snyk-url]

## Instalation
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

addListener((log: LogEvent) => {
  console.log(log.level, log.message, 'at', log.timestamp);
});
```

In a some other place
```typescript
import { verbose } from 'loggry';

function myFunction() {
  verbose('myFunction', 'executed!');
}
```

## License

License [The MIT License](http://opensource.org/licenses/MIT)
Copyright (c) 2021 Ivan Zakharchanka

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
