export type ADDIEPhase =
  | "Analysis"
  | "Design"
  | "Development"
  | "Implementation"
  | "Evaluation";

export type Role =
  | "Instructional Designer"
  | "Iteration Manager"
  | "Programmer"
  | "Visual Designer"
  | "QA";

export interface Prompt {
  id: string;
  title: string;
  phase: ADDIEPhase;
  role: Role;
  prompt: string;
}
