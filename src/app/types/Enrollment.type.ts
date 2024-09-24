import { CourseResponseDTO } from "./Course.type";
import { User } from "./User.type";

export type Enrollment = {
  id: number | null;
  user: User;
  course: CourseResponseDTO;
};

export type EnrollmentResponseDTO = {
  id: number;
  user: User;
  course: CourseResponseDTO;
  enrollmentDate: Date;
  currentLesson: number;
};
