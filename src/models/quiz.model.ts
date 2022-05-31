import { HirakataModel, KanjiModel } from "./req-res.model";

export interface QuizModel {
  randomInteger: number;
  isAnswering: boolean;
}

export interface QuizHirakataModel extends QuizModel {
  question: HirakataModel;
  options: HirakataModel[];
}

export interface QuizKanjiModel extends QuizModel {
  question: KanjiModel;
  options: KanjiModel[];
}

export interface QuizRoom {
  [roomId: string]: QuizHirakataModel | QuizKanjiModel;
}
