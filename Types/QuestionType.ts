import { AnswerType } from "./AnswerType"; // Add this import statement

export interface QuestionType {
  id: number;
  text: string;
  right_answer_id: number;
  created_at: string;
  updated_at: string;
  answers: AnswerType[];
}
