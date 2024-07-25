import { Unit } from './Unit.type';

export type Lesson = {
  id: number | null;
  unit: Unit;
  title: string;
  description: string;
  points: number;
  index: number;
};
