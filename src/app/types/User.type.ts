export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  score: number;
  lives: number;
  creationDate: Date;
  lastAccessDate: Date;
  userRole: string | undefined;
};
