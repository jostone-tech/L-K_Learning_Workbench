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

export type LearningType =
  | "ILT"
  | "Self-Paced eLearning"
  | "Microlearning"
  | "Scenario-based"
  | "Experiential"
  | "Social and Collaborative"
  | "Coaching and Mentoring"
  | "Performance Support"
  | "Assessment and Practice"
  | "Adaptive and Personalized"
  | "Blended Learning"
  | "Other";

export type DeliveryType =
  | "iSPO"
  | "Video"
  | "AI-Assisted Review"
  | "Podcast"
  | "Chatbot"
  | "Job Aid"
  | "Workshop Activity"
  | "Other";

export interface Prompt {
  id: string;
  title: string;
  phase: ADDIEPhase;
  role: Role;
  learningType?: LearningType;
  deliveryType?: DeliveryType;
  contributor?: string;
  prompt: string;
}
