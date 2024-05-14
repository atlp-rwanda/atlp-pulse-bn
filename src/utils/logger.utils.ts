// logger.ts
import { ILogObj, Logger } from 'tslog';

const isDebug = process.env.DEBUG === 'true'

const logger: Logger<ILogObj> = new Logger({
  hideLogPositionForProduction: process.env.NODE_ENV === 'production',
  type: isDebug ? 'pretty' : 'hidden',
});

export default logger;
