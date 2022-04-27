import http from 'node:http';
import https from 'node:https';
import { URL, URLSearchParams } from 'node:url';

import fetch, { HeadersInit } from 'node-fetch';

export async function NodeFetchGET(
  url: URL,
  headers: HeadersInit,
  agentOpt: http.AgentOptions = {
    keepAlive: false
  }
) {
  const httpAgent = new http.Agent(agentOpt);
  const httpsAgent = new https.Agent(agentOpt);
  return fetch(url.toString(), {
    method: 'GET',
    headers,
    agent: (_parsedURL) => {
      if (_parsedURL.protocol == 'http:') {
        return httpAgent;
      } else {
        return httpsAgent;
      }
    }
  });
}

export async function NodeFetchPOST(
  url: URL,
  form: FormData | URLSearchParams,
  headers: HeadersInit,
  agentOpt: http.AgentOptions = {
    keepAlive: false
  }
) {
  const httpAgent = new http.Agent(agentOpt);
  const httpsAgent = new https.Agent(agentOpt);
  return fetch(url.toString(), {
    method: 'POST',
    body: form,
    headers,
    agent: (_parsedURL) => {
      if (_parsedURL.protocol == 'http:') {
        return httpAgent;
      } else {
        return httpsAgent;
      }
    }
  });
}
