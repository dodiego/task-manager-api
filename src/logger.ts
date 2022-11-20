import pino from "pino";

const logger = pino();

type JsonPrimitive = null | number | string | boolean;
type PlainJson = {
  [key: string]: JsonPrimitive;
};
export default {
  logInfo: (message: string, context: PlainJson = {}) =>
    logger.info(context, message),
  logWarning: (message: string, context: PlainJson = {}) =>
    logger.info(context, message),
  logError: (error: Error, context: PlainJson = {}) =>
    logger.info({
      ...context,
      errorMessage: error.message,
      stackTrace: error.stack,
    }),
};
