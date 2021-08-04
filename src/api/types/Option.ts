import { NumberMap } from "./NumberMap";

export interface Option {
    readonly id: number;
    readonly body: string;
    readonly isCorrect: boolean;
    readonly questionId: number;
    readonly optionOrder: number;
  }

export type OptionMap = NumberMap<Option>;

export type QuestionOptionsMap = NumberMap<OptionMap>;

export type QuizOptionsMap = NumberMap<QuestionOptionsMap>;