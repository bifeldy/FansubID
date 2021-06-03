import { getRepository, IsNull, Not } from "typeorm";

import { Hirakata } from "../entities/Hirakata";

const listQuestionHirakata = [];

export async function initializeQuizHirakata(): Promise<any> {
  try {
    const hirakataRepo = getRepository(Hirakata);
    const hirakatas = await hirakataRepo.find({
      where: [
        { hiragana: Not(IsNull()) },
        { katakana: Not(IsNull()) }
      ],
      order: {
        segment: 'ASC',
        category: 'ASC',
        romaji: 'ASC'
      }
    });
    for (const h of hirakatas) {
      if (h.hiragana && h.katakana) {
        listQuestionHirakata.push({
          romaji: h.romaji,
          hiragana: h.hiragana,
          katakana: h.katakana,
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
}

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getQuizHirakata(min = 0, max = listQuestionHirakata.length - 1) {
  const randomInteger = getRandomInt(min, max);
  if (randomInteger < 2) {
    return {
      randomInteger,
      question: listQuestionHirakata[randomInteger],
      options: [
        listQuestionHirakata[0],
        listQuestionHirakata[1],
        listQuestionHirakata[2],
        listQuestionHirakata[3],
        listQuestionHirakata[4]
      ]
    };
  } else if (randomInteger > listQuestionHirakata.length - 3) {
    return {
      randomInteger,
      question: listQuestionHirakata[randomInteger],
      options: [
        listQuestionHirakata[listQuestionHirakata.length - 5],
        listQuestionHirakata[listQuestionHirakata.length - 4],
        listQuestionHirakata[listQuestionHirakata.length - 3],
        listQuestionHirakata[listQuestionHirakata.length - 2],
        listQuestionHirakata[listQuestionHirakata.length - 1]
      ]
    };
  } else {
    return {
      randomInteger,
      question: listQuestionHirakata[randomInteger],
      options: [
        listQuestionHirakata[randomInteger - 2],
        listQuestionHirakata[randomInteger - 1],
        listQuestionHirakata[randomInteger],
        listQuestionHirakata[randomInteger + 1],
        listQuestionHirakata[randomInteger + 2]
      ]
    };
  }
}

export async function getQuizKanji(school = null, jlpt = null) {
  return;
}