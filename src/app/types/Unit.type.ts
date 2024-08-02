import { Course } from './Course.type';
import { LessonResponseDTO } from './Lesson.type';

export type Unit = {
  id: number | null;
  course: Course;
  title: string;
  description: string;
  points: number;
  index: number;
};

export type UnitResponseDTO = {
  id: number | null;
  title: string;
  description: string;
  points: number;
  index: number;
  lessonList: LessonResponseDTO[];
};
