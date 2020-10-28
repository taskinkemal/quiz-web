import { NumberMap } from "./NumberMap";

export interface Question {
    readonly id: number;
    readonly body: string;
    readonly level: number;
    readonly type: QuestionType;
  }

export type QuestionType = 'MultiSelect' | 'MultiSelectMultiOptions';

export type QuestionMap = NumberMap<Question>;

export type QuizQuestionsMap = NumberMap<QuestionMap>;