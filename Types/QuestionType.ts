import { AnswerType } from "./AnswerType"; // Add this import statement

export interface QuestionType {
  id: number | null;
  text: string;
  right_answer_id: number | null;
  created_at: string;
  updated_at: string;
  answers: AnswerType[];
}
