import logger from "./logger.utils";

const logGraphQLRequests = {
    // Fires whenever a GraphQL request is received from a client.
    async requestDidStart(requestContext: any) {
        const noNewlinesQuery: string = requestContext.request.query.replace(/\n/g, '').replace(/\s{2,}/g, ' ');
        logger.debug('Request Query:\n' + noNewlinesQuery +
            '\n Request Variables: \n ' +
            JSON.stringify(requestContext.request.variables));
    },
};
export default logGraphQLRequests;
