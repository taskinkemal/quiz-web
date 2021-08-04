import { request, Response } from '../../request';
import { OptionMap, Option, toNumberMap } from '../../types';

export default function f(url: string, accessToken: string) {
  return {
    get: async (quizId: number, questionId: number): Promise<OptionMap> => {
      const response: Response<Option[]> = await request(url)
        .authorized(accessToken)
        .get<Option[]>(`Admin/Quizzes/${quizId}/Questions/${questionId}/Options`);
      return toNumberMap(Object.values(response.data));
    }
  };
}