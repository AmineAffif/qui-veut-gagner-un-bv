export interface StatisticType {
  id: number;
  global_score: number;
  rank_value: string;
}

export interface StatisticResponse {
  statistic: StatisticType;
  global_score: number,
  games_count: number;
  total_questions_count: number;
  correct_answers_count: number;
  incorrect_answers_count: number;
  correct_answers_percentage: number;
  best_score: number;
  average_score: number;
}
