import { ContentResponseDTO } from './Content.type';
import { Question, QuestionResponseDTO } from './Question.type';
import { Unit } from './Unit.type';

export type Lesson = {
  id: number | null;
  unit: Unit;
  title: string;
  description: string;
  points: number;
  index: number;
};

export type LessonResponseDTO = {
  id: number;
  title: string;
  description: string;
  points: number;
  index: number;
  questionList: QuestionResponseDTO[];
  contentList: ContentResponseDTO[];
};
