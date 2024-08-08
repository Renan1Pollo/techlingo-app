import { AnswerResponseDTO } from './Answer.type';
import { Lesson } from './Lesson.type';

export type Question = {
  id: number | null;
  lesson: Lesson;
  description: string;
  index: number;
};

export type QuestionResponseDTO = {
  id: number;
  description: string;
  index: number;
  answerList: AnswerResponseDTO[];
};
