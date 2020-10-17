import { request, Response } from '../../request';
import { QuizMap, Quiz, toNumberMap } from '../../types';

export default function (url: string, accessToken: string) {
  return {
    get: async (): Promise<QuizMap> => {
      const response: Response<Quiz[]> = await request(url)
        .authorized(accessToken)
        .get<Quiz[]>('Admin/Quizzes');
      return toNumberMap(Object.values(response.data));
    }
  };
}