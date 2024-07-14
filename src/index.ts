export type LogLevel = string
  | 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'silent'
  | 'http' | 'notice' | 'timing' | 'info' | 'verbose' | 'silly'
  | 'alert' | 'critical' | 'serve' | 'config' | 'emergency'
  ;

export interface LogEvent<T = unknown> {
  level: LogLevel;
  message: string;
  details?: T;
  stack?: string;
  timestamp: number;
}

export interface LogListener<T = unknown> {
  (log: LogEvent<T>): void;
}

export const LOG_EVENT = Symbol('log');

declare global {
  namespace NodeJS {
    interface Process {
      emit(event: typeof LOG_EVENT, log: LogEvent<any>): boolean;
      on(event: typeof LOG_EVENT, listener: LogListener): this;
      listeners(event: typeof LOG_EVENT): LogListener[];
    }
  }
}

export const getObject = (target: unknown) => {
  return target && typeof target === 'object' ? Object.fromEntries<unknown>(Object.entries(target).filter(([key]) => target.hasOwnProperty(key))) : target;
}

export const defaultErrorOutput = (data: LogEvent<unknown>) => {
  process.stderr.write(JSON.stringify(data) + '\n');
};

export const defaultLogger = (event: LogEvent<unknown>) => {
  const listeners = process.listeners(LOG_EVENT);
  if (listeners.length === 1 && listeners[0] === defaultLogger) {
    const details = getObject(event.details);
    defaultErrorOutput({ level: 'warn', message: `No loggers are registered`, details: { ...event, details }, timestamp: Date.now(), stack: new Error().stack });
  }
};

export interface LogFunction {
  (message: string, details?: unknown): void;
}

export const log = <T = unknown>(level: LogLevel, message: string, details?: T) => {
  const timestamp = Date.now();
  //const stack = new Error().stack?.split(/\s*\n\s*/g).slice(2).join('\n');
  process.emit(LOG_EVENT, { level, message, details, timestamp, stack: new Error().stack });
};

export const logger: Record<LogLevel, LogFunction> = new Proxy({}, {
  get: function (_, logLevel: string) {
    return (message: string, details?: unknown) => log(logLevel, message, details);
  }
});;

export const addListener = (listener: LogListener) => process.on(LOG_EVENT, listener);

export const removeListener = (listener: LogListener) => process.off(LOG_EVENT, listener);

process.on(LOG_EVENT, defaultLogger);

export const uncaughtExceptionHandler: NodeJS.UncaughtExceptionListener = (err, origin) => logger[options.uncaughtExceptionEvent](origin, err);
process.on('uncaughtException', uncaughtExceptionHandler);

export const unhandledRejectionHandler: NodeJS.UnhandledRejectionListener = (err) => logger[options.unhandledRejectionEvent]('unhandledRejection', err);
process.on('unhandledRejection', unhandledRejectionHandler);

export const processErrorHandler: NodeJS.UnhandledRejectionListener = (err) => logger[options.processErrorEvent]('processError', err);
process.on('error', processErrorHandler);

export const options = {
  uncaughtExceptionEvent: 'error',
  unhandledRejectionEvent: 'error',
  processErrorEvent: 'error',
};
