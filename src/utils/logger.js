// Simple logger utility with environment-aware output
// Usage: import logger from './logger'; logger.info('msg');

const isProduction = process.env.NODE_ENV === 'production';

function formatMessage(level, args) {
  const timestamp = new Date().toISOString();
  return [`[${timestamp}] [${level.toUpperCase()}]`, ...args];
}

const logger = {
  info: (...args) => {
    if (isProduction) return; // silence info in production
    // eslint-disable-next-line no-console
    console.log(...formatMessage('info', args));
  },
  warn: (...args) => {
    // eslint-disable-next-line no-console
    console.warn(...formatMessage('warn', args));
  },
  error: (...args) => {
    // eslint-disable-next-line no-console
    console.error(...formatMessage('error', args));
  },
  debug: (...args) => {
    if (isProduction) return; // silence debug in production
    // eslint-disable-next-line no-console
    console.debug(...formatMessage('debug', args));
  },
  log: (...args) => {
    if (isProduction) return;
    // eslint-disable-next-line no-console
    console.log(...formatMessage('log', args));
  }
};

export default logger;

