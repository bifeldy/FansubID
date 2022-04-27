import { NihongoModel } from "../../../models/req-res.model";

export interface DialogDataModel {
  confirmText?: string;
  cancelText?: string;
}

export interface DialogNihongoDataModel extends DialogDataModel {
  title?: string;
  modeTampilan: string;
  dataset?: NihongoModel;
  htmlMessage?: string;
}

export interface DialogInputDataModel extends DialogDataModel {
  title?: string;
  input: any;
}

export interface DialogInfoDataModel extends DialogDataModel {
  title?: string;
  htmlMessage?: string;
}

export interface DialogDmakDataModel {
  romaji?: string;
  hiragana_katakana_kanji?: string;
}