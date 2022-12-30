import { HirakataModel, KanjiModel, NihongoModel } from "./req-res.model";

export interface QuizModel {
  randomInteger: number;
  isAnswering: boolean;
}

export interface QuizHirakataModel extends QuizModel {
  question: HirakataModel;
  options: HirakataModel[];
}

export interface QuizCategoryModel extends QuizModel {
  question: NihongoModel;
  options: NihongoModel[];
}

export interface QuizKanjiModel extends QuizModel {
  question: KanjiModel;
  options: KanjiModel[];
}

export interface QuizRoom {
  [roomId: string]: QuizHirakataModel | QuizKanjiModel;
}
