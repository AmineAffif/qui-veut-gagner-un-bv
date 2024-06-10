export interface StatisticType {
  id: number;
  global_score: number;
  rank: string;
}

export interface StatisticResponse {
  statistic: StatisticType;
  games_count: number;
  correct_answers_percentage: number;
}