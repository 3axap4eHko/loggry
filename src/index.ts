export enum LogLevel {
  silent,
  fatal,
  error,
  warn,
  info,
  debug,
  trace,
}

export type LogLevels = keyof typeof LogLevel;

export interface LogEvent<T = unknown> {
  level: LogLevels;
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

export const log = <T = any>(level: LogLevels, message: string, details?: T) => {
  const timestamp = Date.now();
  //const stack = new Error().stack?.split(/\s*\n\s*/g).slice(2).join('\n');
  process.emit(LOG_EVENT, { level, message, details, timestamp, stack: new Error().stack });
};

export const trace = <T = any>(message: string, details?: T) => log('trace', message, details);

export const debug = <T = any>(message: string, details?: T) => log('debug', message, details);

export const info = <T = any>(message: string, details?: T) => log('info', message, details);

export const warn = <T = any>(message: string, details?: T) => log('warn', message, details);

export const error = <T = any>(message: string, details?: T) => log('error', message, details);

export const fatal = <T = any>(message: string, details?: T) => log('fatal', message, details);

export const silent = <T = any>(message: string, details?: T) => log('silent', message, details);

export const addListener = (listener: LogListener) => process.on(LOG_EVENT, listener);

export const removeListener = (listener: LogListener) => process.off(LOG_EVENT, listener);

process.on(LOG_EVENT, defaultLogger);

export const uncaughtExceptionHandler: NodeJS.UncaughtExceptionListener = (err, origin) => error(origin, err);
process.on('uncaughtException', uncaughtExceptionHandler);

export const unhandledRejectionHandler: NodeJS.UnhandledRejectionListener = (err) => error('unhandledRejection', err);
process.on('unhandledRejection', unhandledRejectionHandler);
