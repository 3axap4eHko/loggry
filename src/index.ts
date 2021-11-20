export enum LogLevel {
  silent,
  error,
  warn,
  notice,
  http,
  timing,
  info,
  verbose,
  silly,
}

export type LogLevels = keyof typeof LogLevel;

export interface LogEvent<T = any> {
  level: LogLevels;
  message: string;
  details?: T;
  stack?: string;
  timestamp: number;
}

export interface LogListener<T = any> {
  (log: LogEvent<T>): void;
}

declare global {
  namespace NodeJS {
    interface Process {
      on(event: 'uncaughtException', listener: (...args: any[]) => void): this;
      emit(event: 'log', log: LogEvent<any>): boolean;
      on(event: 'log', listener: LogListener): this;
      listeners(event: 'log'): LogListener[];
    }
  }
}

const EVENT_NAME = 'log';

export const defaultLogger = (event: LogEvent<any>) => {
  const count = process.listenerCount(EVENT_NAME);
  if (count === 1) {
    process.stderr.write(JSON.stringify({ error: `No loggers are registered`, ...event }));
  }
};

export const log = <T = any>(level: LogLevels, message: string, details?: T) => {
  // const stack = new Error().stack?.split(/\s*\n\s*/g).slice(2).join('\n');
  const timestamp = Date.now();
  process.emit(EVENT_NAME, { level, message, details, timestamp });
};

export const verbose = <T = any>(message: string, details?: T) => log('verbose', message, details);

export const info = <T = any>(message: string, details?: T) => log('info', message, details);

export const warn = <T = any>(message: string, details?: T) => log('warn', message, details);

export const error = <T = any>(message: string, details?: T) => log('error', message, details);

export const addListener = (listener: LogListener) => process.on(EVENT_NAME, listener);

export const removeListener = (listener: LogListener) => process.off(EVENT_NAME, listener);

process.on(EVENT_NAME, defaultLogger);

process.on('uncaughtException', (err, origin) => error(origin, err));
