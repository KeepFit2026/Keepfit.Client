export type  Difficulty = {
  id: string;
  name: string;
}

export type Answer = {
  id: string;
  content: string;
  is_correct: boolean;
}

export type UserAnswer = {
  questionId: string;
  answerId: string;
}

export type Question = {
  id: string;
  content: string;
  difficulty?: Difficulty;
  answers: Answer[];
}

export type Quizz = {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  xp_reward: number,
  questions: Question[];
}

export type DailyQuiz = {
  id: string;
  scheduled_date: string;
  quizz: Quizz;
}