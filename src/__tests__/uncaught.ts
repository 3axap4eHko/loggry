import * as logger from '../index';

const originalJestListeners: Record<string, unknown[]> = {
  uncaughtException: [],
  unhandledRejection: [],
}

declare global {
  namespace NodeJS {
    interface Process {
      _original(): Process;
    }
  }
}

describe('Logger uncaught errors suite', () => {
  beforeEach(() => {
    const originalProcess = process._original()
    Object.keys(originalJestListeners).forEach((event: any) => {
      originalProcess.listeners(event).forEach((listener: any) => {
        originalJestListeners[event].push(listener)
        originalProcess.off(event, listener)
      })
    })
  });

  it('Shoul catch uncaughtExceptions', async () => {
    const message = 'test';

    const originalProcess = process._original();
    originalProcess.on('uncaughtException', logger.uncaughtExceptionHandler);

    const logFunction = jest.fn();
    logger.addListener(logFunction);

    process.nextTick(() => { throw message; });

    await new Promise(resolve => setTimeout(resolve, 10));

    expect(logFunction).toBeCalledWith(expect.objectContaining({
      level: 'error',
      message: 'uncaughtException',
      details: message,
    }));

    logger.removeListener(logFunction);
  });

  it('Shoul catch unhandledRejection', async () => {
    const message = 'test';

    const originalProcess = process._original();
    originalProcess.on('unhandledRejection', logger.unhandledRejectionHandler);

    const logFunction = jest.fn();
    logger.addListener(logFunction);

    Promise.reject(message);

    await new Promise(resolve => setTimeout(resolve, 10));

    expect(logFunction).toBeCalledWith(expect.objectContaining({
      level: 'error',
      message: 'unhandledRejection',
      details: message,
    }));

    logger.removeListener(logFunction);
  });

  afterEach(() => {
    let listener
    Object.keys(originalJestListeners).forEach((event) => {
      while ((listener = originalJestListeners[event].pop()) !== undefined) {
        process._original().on(event, listener)
      }
    })
  });
});
