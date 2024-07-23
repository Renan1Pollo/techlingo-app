import { Course } from "./Course.type";

export type Unit = {
  id: number | null;
  course: Course;
  title: string;
  description: string;
  points: number;
  index: number;
};
