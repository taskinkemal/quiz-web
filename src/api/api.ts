
import endpoints from './endpoints/endpoints';

function authorize(url: string, accessToken: string) {
  return {
    ...endpoints.authorized(url, accessToken)
  };
}

function api(url: string) {
  return {
    authorize: (accessToken: string) => authorize(url, accessToken),
    ...endpoints.unauthorized(url)
  };
}

export type Api = ReturnType<typeof api>;
export type AuthorizedApi = ReturnType<typeof authorize>;

export default api;
