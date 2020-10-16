
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ErrorResponse } from './ErrorResponse';
import { Response } from './Response';

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT'
}
interface Parameters {
  [indexer: string]: string | number | boolean;
}

function toParametersString(parameters?: Parameters): string {
  if (!parameters) {
    return '';
  }

  const parametersString = Object.keys(parameters)
    .reduce((strings, key) => {
      strings.push(`${key}=${parameters[key]}`);
      return strings;
    }, [] as string[])
    .join('&');

  return `?${parametersString}`;
}

function createUnauthorizedRequest(baseUrl: string, endpoint: string, method: HttpMethod): AxiosRequestConfig {
  return { method, url: `${baseUrl}/${endpoint}` };
}

function createAuthorizedRequest(
  baseUrl: string,
  endpoint: string,
  method: HttpMethod,
  accessToken: string
): AxiosRequestConfig {
  let url = `${baseUrl}/${endpoint}`;

  return {
    method,
    url,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };
}

async function fetch<ResponseData>(requestConfig: AxiosRequestConfig): Promise<Response<ResponseData>> {
  try {
    const axiosResponse: AxiosResponse = await axios(requestConfig);
    return { status: axiosResponse.status, data: axiosResponse.data };
  } catch (error) {
    const backendError: ErrorResponse = {
      name: error.name,
      message: error.message,
      stack: error.stack,
      httpMethod: requestConfig.method as HttpMethod,
      url: requestConfig.url
    };

    if (error.response) {
      backendError.response = { status: error.response.status };
    }

    throw backendError;
  }
}

function unauthorized(baseUrl: string) {
  return {
    post: async <ResponseData>(endpoint: string, data: any): Promise<Response<ResponseData>> =>
      fetch<ResponseData>({ ...createUnauthorizedRequest(baseUrl, endpoint, HttpMethod.POST), data }),
    get: async <ResponseData>(endpoint: string, parameters?: Parameters): Promise<Response<ResponseData>> =>
      fetch<ResponseData>({
        ...createUnauthorizedRequest(baseUrl, `${endpoint}${toParametersString(parameters)}`, HttpMethod.GET)
      }),
    delete: async <ResponseData>(endpoint: string, parameters?: Parameters): Promise<Response<ResponseData>> =>
      fetch<ResponseData>({
        ...createUnauthorizedRequest(baseUrl, `${endpoint}${toParametersString(parameters)}`, HttpMethod.DELETE)
      })
  };
}

function authorized(baseUrl: string, accessToken: string) {
  return {
    post: async <ResponseData>(endpoint: string, data: any): Promise<Response<ResponseData>> =>
      fetch<ResponseData>({
        ...createAuthorizedRequest(baseUrl, endpoint, HttpMethod.POST, accessToken),
        data
      }),
    put: async <ResponseData>(endpoint: string, data: any): Promise<Response<ResponseData>> =>
      fetch<ResponseData>({
        ...createAuthorizedRequest(baseUrl, endpoint, HttpMethod.PUT, accessToken),
        data
      }),
    get: async <ResponseData>(endpoint: string, parameters?: Parameters): Promise<Response<ResponseData>> =>
      fetch<ResponseData>({
        ...createAuthorizedRequest(
          baseUrl,
          `${endpoint}${toParametersString(parameters)}`,
          HttpMethod.GET,
          accessToken
        )
      }),
    delete: async <ResponseData>(endpoint: string, parameters?: Parameters): Promise<Response<ResponseData>> =>
      fetch<ResponseData>({
        ...createAuthorizedRequest(
          baseUrl,
          `${endpoint}${toParametersString(parameters)}`,
          HttpMethod.DELETE,
          accessToken
        )
      })
  };
}

export function request(baseUrl: string) {
  return {
    authorized: (accessToken: string) => authorized(baseUrl, accessToken),
    unauthorized: unauthorized(baseUrl)
  };
}
