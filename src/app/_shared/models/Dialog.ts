import { NihongoModel } from "../../../models/req-res.model";

export interface DialogDataModel {
  title?: string;
  confirmText?: string;
  cancelText?: string;
  infoText?: string;
}

export interface DialogNihongoDataModel extends DialogDataModel {
  modeTampilan: string;
  dataset?: NihongoModel;
  htmlMessage?: string;
}

export interface DialogInputDataModel extends DialogDataModel {
  input: any;
}

export interface DialogInfoDataModel extends DialogDataModel {
  htmlMessage?: string;
}

export interface DialogDmakDataModel {
  romaji?: string;
  hiragana_katakana_kanji?: string;
}