import winston from 'winston';
import 'winston-mongodb';
import { LOGS_DB_COLLECTION, LOGS_DB_NAME, LOGS_DB_URL } from './constants';

const transportConsole = new winston.transports.Console({
  format: winston.format.simple(),
});

const transportMongo = new winston.transports.MongoDB({
  db: LOGS_DB_URL,
  dbName: LOGS_DB_NAME,
  collection: LOGS_DB_COLLECTION,
  options: { useUnifiedTopology: true },
});

export const createLogger = (service: string) => {
  return winston.createLogger({
    format: winston.format.json(),
    defaultMeta: { service },
    transports: [transportConsole, transportMongo],
  });
};
