import { request, Response } from '../../request';
import { User } from '../../types';

export default function f(url: string, accessToken: string): { me: () => Promise<User> } {
  return {
    me: async (): Promise<User> => {
      const response: Response<User> = await request(url).authorized(accessToken).get<User>('Users/me');
      return response.data;
    }
  };
}