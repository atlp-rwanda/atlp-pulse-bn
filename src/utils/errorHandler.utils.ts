// Place this near the end of your file where you setup the server or in a separate middleware file

import { Request, Response, NextFunction } from 'express';
import logger from './logger.utils';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
    // Log the error internally
    logger.error(`Error: ${err.message}`, { error: err });

    // Respond to the client
    // Avoid sending error details in production for security reasons
    if (process.env.NODE_ENV === 'production') {
        res.status(500).send('Internal Server Error');
    } else {
        res.status(500).send(`Error: ${err.message}\n${err.stack}`);
    }
}

export default errorHandler;
