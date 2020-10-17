import { NumberMap } from "./NumberMap";

export interface Quiz {
    readonly id: number;
    readonly quizIdentityId: number;
    readonly status: QuizStatus;
    readonly version: number;
    readonly title: string;
    readonly intro: string;
    readonly timeLimitInSeconds: number;
    readonly timeConstraint: boolean;
    readonly shuffleQuestions: boolean;
    readonly shuffleOptions: boolean;
    readonly passScore?: number;
    readonly repeatable: boolean;
  }

export type QuizStatus = 'Inactive' | 'Current' | 'Draft';

export type QuizMap = NumberMap<Quiz>;