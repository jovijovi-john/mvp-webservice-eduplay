import { QuestionType } from "./QuestionType";
import { UsersType } from "./UsersType";

type QuestionAnswersType = {
  answer1: number;
  answer2: number;
  answer3: number;
  answer4: number;
  successes: number;
  errors: number;
};

export type RoomType = {
  pin: string;
  url: string;
  level: "elementarySchool" | "highSchool";
  users: UsersType | {};
  questions: QuestionType[];
  questionnaireStatistics: QuestionAnswersType[];
  quizStarted: boolean;
  currentQuestion: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};
