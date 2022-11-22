import pino from "pino";
import { PlainJson } from "./types";

const logger = pino({
  redact: ["password", "confirmPassword"],
});

export const logInfo = (message: string, context: PlainJson = {}): void =>
  logger.info(context, message);

export const logWarning = (message: string, context: PlainJson = {}): void =>
  logger.info(context, message);

export const logError = (error: Error, context: PlainJson = {}): void =>
  logger.info({
    ...context,
    errorMessage: error.message,
    stackTrace: error.stack,
  });

export const logFatal = (error: Error): void =>
  logger.fatal({ errorMessage: error.message, stackTrace: error.stack });
