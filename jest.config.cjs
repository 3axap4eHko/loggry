module.exports = {
  verbose: true,
  collectCoverage: !!process.env.CI,
  collectCoverageFrom: ['src/**/*.ts'],
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    '/coverage',
    '/node_modules/',
    '__tests__',
  ],
  coverageDirectory: './coverage',
  transform: {
    '^.+\\.ts$': '@swc/jest',
  },
  globalSetup: './jest.setup.global.ts',
};
