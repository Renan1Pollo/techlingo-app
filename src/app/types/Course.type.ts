import { UnitResponseDTO } from "./Unit.type";

export type Course = {
  id: number | null;
  name: string;
  description: string;
  image: string;
};

export type CourseResponseDTO = {
  id: number;
  name: string;
  description: string;
  image: string;
  unitList: UnitResponseDTO[];
};
