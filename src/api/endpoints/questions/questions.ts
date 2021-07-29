import { request, Response } from '../../request';
import { QuestionMap, Question, toNumberMap } from '../../types';

export default function (url: string, accessToken: string) {
  return {
    get: async (quizId: number): Promise<QuestionMap> => {
      const response: Response<Question[]> = await request(url)
        .authorized(accessToken)
        .get<Question[]>(`Admin/Quizzes/${quizId}/Questions`);
      return toNumberMap(Object.values(response.data));
    },
    insert: async (quizId: number, data: Question): Promise<number> => {
      const response: Response<number> = await request(url)
        .authorized(accessToken)
        .put<number>(`Admin/Quizzes/${quizId}/Questions`, data);
      return response.data;
    },
    update: async (quizId: number, data: Question): Promise<number> => {
      const response: Response<number> = await request(url)
        .authorized(accessToken)
        .post<number>(`Admin/Quizzes/${quizId}/Questions/${data.id}`, data);
      return response.data;
    },
    delete: async (quizId: number, questionId: number): Promise<boolean> => {
      const response: Response<boolean> = await request(url)
        .authorized(accessToken)
        .delete<boolean>(`Admin/Quizzes/${quizId}/Questions/${questionId}`);
      return response.data;
    }
  };
}