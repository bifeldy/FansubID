import { getManager } from "typeorm";

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function getQuizHirakata() {
  try {
    const manager = getManager();
    let hirakatas = await manager.query(`
      DO $$
      DECLARE
        random_number DOUBLE PRECISION;
        select_count BIGINT := 5;
        total_data BIGINT;
        max_select BIGINT;
      BEGIN
        SELECT RANDOM()
          INTO random_number;
        SELECT COUNT(*)
          INTO total_data
          FROM hirakata
          WHERE hiragana IS NOT NULL AND hiragana <> '' AND katakana IS NOT NULL AND katakana <> '';
        max_select := total_data - select_count;
        DROP TABLE IF EXISTS hirakata_quiz;
        CREATE TABLE hirakata_quiz AS
          SELECT *
          FROM hirakata
          WHERE hiragana IS NOT NULL AND hiragana <> '' AND katakana IS NOT NULL AND katakana <> ''
          OFFSET
            CASE
              WHEN FLOOR(random_number * total_data) >= max_select THEN max_select
              ELSE FLOOR(random_number * total_data)
            END
          LIMIT select_count;
      END $$
    `);
    hirakatas = await manager.query(`SELECT * FROM hirakata_quiz`);
    const randomInteger = getRandomInt(0, hirakatas.length);
    return {
      randomInteger,
      question: hirakatas[randomInteger],
      options: hirakatas
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getQuizKanji(school = null, jlpt = null) {
  return;
}