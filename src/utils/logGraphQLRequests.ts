const logGraphQLRequests = {
  // Fires whenever a GraphQL request is received from a client.
  async requestDidStart(requestContext: any) {
    const noNewlinesQuery: string = requestContext.request.query
      .replace(/\n/g, '')
      .replace(/\s{2,}/g, ' ')
  },
}

export default logGraphQLRequests
