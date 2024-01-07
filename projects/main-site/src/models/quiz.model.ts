import { HirakataModel, KanjiModel, NihongoModel } from "./req-res.model";

export interface QuizModel<T> {
  randomInteger: number;
  question: T;
  options: T[];
}

export interface QuizHirakataModel extends QuizModel<HirakataModel> {}

export interface QuizCategoryModel extends QuizModel<NihongoModel> {}

export interface QuizKanjiModel extends QuizModel<KanjiModel> {}

export interface QuizRoom {
  [roomId: string]: QuizModel<any>;
}
