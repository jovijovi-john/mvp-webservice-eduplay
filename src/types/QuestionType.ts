export type QuestionType = {
  elementarySchool: Question;
  highSchool: Question;
};

export type Question = {
  title: string;
  options: OptionsType;
  correctAnswer: "1" | "2" | "3" | "4";
};

type OptionsType = {
  1: string;
  2: string;
  3: string;
  4: string;
};
