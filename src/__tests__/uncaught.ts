import * as logger from '../index';

const originalJestListeners: Record<string, any[]> = {
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

    const defaultErrorOutput = jest.spyOn(logger, 'defaultErrorOutput');
    defaultErrorOutput.mockImplementation(() => {});

    const originalProcess = process._original();
    originalProcess.on('uncaughtException', logger.uncaughtExceptionHandler);
    originalProcess.on('unhandledRejection', logger.unhandledRejectionHandler);

    Promise.reject(new Error(message));
    setTimeout(() => { throw new Error(message) }, 0);

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(defaultErrorOutput).toBeCalledWith(expect.objectContaining({
      level: 'warn',
      message: 'No loggers are registered',
      details: expect.objectContaining({
        level: 'error',
        message: 'uncaughtException',
        details: expect.objectContaining({
          message,
        }),
      })
    }));
    expect(defaultErrorOutput).toBeCalledWith(expect.objectContaining({
      level: 'warn',
      message: 'No loggers are registered',
      details: expect.objectContaining({
        level: 'error',
        message: 'unhandledRejection',
        details: expect.objectContaining({
          message,
        }),
      })
    }));
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
