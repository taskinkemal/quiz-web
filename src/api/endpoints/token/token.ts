import { request, Response } from '../../request';

interface Payload {
  token: string;
  validUntil: string;
}

export default function f(url: string) {
  const { unauthorized, authorized } = request(url);

  return {
    validate: async (accessToken: string): Promise<boolean> => {
      const response: Response<boolean> = await unauthorized.get<boolean>('Token', { token: accessToken });
      return response.data;
    },
    create: async (email: string, password: string, deviceId: string, rememberMe: boolean): Promise<string> => {
      const response: Response<Payload> = await unauthorized.post<Payload>('Token', {
        email,
        password,
        deviceId,
        rememberMe
      });
      return response.data.token;
    },
    delete: async (accessToken: string): Promise<boolean> => {
      const response: Response<boolean> = await authorized(accessToken).delete<boolean>('Token');
      return response.data;
    }
  };
}
