import * as logger from '../index';

type ModuleFunctions = keyof typeof logger;

describe('Logger test suite', () => {
  it.each([
    ['LogLevel' as ModuleFunctions],
    ['defaultLogger' as ModuleFunctions],
    ['log' as ModuleFunctions],
    ['trace' as ModuleFunctions],
    ['debug' as ModuleFunctions],
    ['info' as ModuleFunctions],
    ['warn' as ModuleFunctions],
    ['error' as ModuleFunctions],
    ['fatal' as ModuleFunctions],
    ['silent' as ModuleFunctions],
    ['addListener' as ModuleFunctions],
    ['removeListener' as ModuleFunctions],
  ])('Should export method %s', (method: ModuleFunctions) => {
    expect(logger[method]).toBeDefined();
  });

  it('Should register the default listener', () => {
    process.listeners(logger.LOG_EVENT).includes(logger.defaultLogger);
  });

  it('Should log info', () => {
    const level = 'trace';
    const message = 'test';
    const details = 'details';

    const logFunction = jest.fn();

    logger.addListener(logFunction);
    logger.log(level, message, details);
    expect(logFunction).toHaveBeenCalledWith(
      expect.objectContaining({
        level,
        message,
        details,
        timestamp: expect.any(Number),
      })
    );
    logger.removeListener(logFunction);
  });
});
