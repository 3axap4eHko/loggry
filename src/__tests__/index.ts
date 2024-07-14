import * as loggry from '../index';

type ModuleExport = keyof typeof loggry;

describe('Logger test suite', () => {
  it.each([
    ['defaultLogger' as ModuleExport],
    ['log' as ModuleExport],
    ['logger' as ModuleExport],
    ['getObject' as ModuleExport],
    ['defaultErrorOutput' as ModuleExport],
    ['addListener' as ModuleExport],
    ['removeListener' as ModuleExport],
    ['options' as ModuleExport],
  ])('Should export %s', (name: ModuleExport) => {
    expect(loggry[name]).toBeDefined();
  });

  it('Should register the default listener', () => {
    process.listeners(loggry.LOG_EVENT).includes(loggry.defaultLogger);
    const write = jest.spyOn(process.stderr, 'write');
    write.mockImplementationOnce(Boolean);
    loggry.defaultLogger({
      level: 'trace',
      message: '',
      details: null,
      timestamp: 1,
    });
    expect(write).toHaveBeenCalled();
  });

  it('Should get only own object properties', () => {
    const input = {};
    Object.defineProperty(input, 'a', { value: 1, enumerable: true });
    Object.defineProperty(input, 'b', { value: 2, enumerable: false });
    const result = loggry.getObject(input);
    expect(result).toEqual({ a: 1 });
  });

  it('Should write to stderr by defaultErrorOutput', () => {
    const write = jest.spyOn(process.stderr, 'write');
    write.mockImplementationOnce(Boolean);
    loggry.defaultErrorOutput({
      level: 'trace',
      message: '',
      details: null,
      timestamp: 1,
    });
    expect(write).toHaveBeenCalled();
  });

  it('Should log info', () => {
    const level = 'trace';
    const message = 'test';
    const details = 'details';

    const logFunction = jest.fn();

    loggry.addListener(logFunction);
    loggry.log(level, message, details);
    expect(logFunction).toHaveBeenCalledWith(
      expect.objectContaining({
        level,
        message,
        details,
        timestamp: expect.any(Number),
      })
    );
    loggry.removeListener(logFunction);
  });
});
