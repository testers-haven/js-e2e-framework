import fs from 'fs';
import { GraphQLClient } from 'graphql-request';
import https from 'https';
import fetch from 'node-fetch';

/*
 * graphQLClient allows to set endpoint and headers on the fly:
 * endpoint: client.setEndpoint('http://backoffice.staging.io/graphql')
 * single headers: client.setHeader('authorization', 'Bearer MY_TOKEN')
 * other options: https://www.npmjs.com/package/graphql-request#incrementally-setting-headers
 */
export default class Fetcher {
  constructor(mainEndpoint, userAgent) {
    let agent = process.env.CI
      ? new https.Agent({ keepAlive: true, cert: fs.readFileSync('../default.io.crt'), key: fs.readFileSync('../default.io.key') })
      : new https.Agent();

    this.graphqlClient = new GraphQLClient(mainEndpoint, {
      headers: {
        'user-agent': userAgent,
      },
      fetch: (url, init) => {
        return fetch(mainEndpoint, { agent, ...init });
      },
    });
  }
}
