import { Lesson } from './Lesson.type';
import { Question } from './Question.type';

export type Answer = {
  id: number | null;
  text: string;
  question: Question;
  feedbackText: string;
  correct: boolean;
};

export type AnswerResponseDTO = {
  id: number;
  text: string;
  feedbackText: string;
  correct: boolean;
};
