import { Lesson } from './Lesson.type';

export type Content = {
  id: number | null;
  lesson: Lesson;
  title: string;
  text: string;
  image?: string;
  index: number;
};

export type ContentResponseDTO = {
  id: number | null;
  title: string;
  text: string;
  image?: string;
  index: number;
};
