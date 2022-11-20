import pino from "pino";
import { PlainJson } from "./types";

const logger = pino();

export const logInfo = (message: string, context: PlainJson = {}) =>
  logger.info(context, message);

export const logWarning = (message: string, context: PlainJson = {}) =>
  logger.info(context, message);

export const logError = (error: Error, context: PlainJson = {}) =>
  logger.info({
    ...context,
    errorMessage: error.message,
    stackTrace: error.stack,
  });
