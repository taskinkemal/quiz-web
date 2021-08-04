import { request, Response } from '../../request';
import { QuizMap, Quiz, toNumberMap } from '../../types';

export default function f(url: string, accessToken: string) {
  return {
    get: async (): Promise<QuizMap> => {
      const response: Response<Quiz[]> = await request(url)
        .authorized(accessToken)
        .get<Quiz[]>('Admin/Quizzes');
      return toNumberMap(Object.values(response.data));
    },
    insert: async (data: Quiz): Promise<number> => {
      const response: Response<number> = await request(url)
        .authorized(accessToken)
        .put<number>('Admin/Quizzes', data);
      return response.data;
    },
    update: async (data: Quiz): Promise<number> => {
      const response: Response<number> = await request(url)
        .authorized(accessToken)
        .post<number>(`Admin/Quizzes/${data.id}`, data);
      return response.data;
    },
    delete: async (quizId: number): Promise<boolean> => {
      const response: Response<boolean> = await request(url)
        .authorized(accessToken)
        .delete<boolean>(`Admin/Quizzes/${quizId}`);
      return response.data;
    }
  };
}