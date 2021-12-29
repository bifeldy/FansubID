import { getManager } from 'typeorm';

const hirakataQuizOptionsCount = 5;
const kanjiQuizOptionsCount = 6;

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
        select_count BIGINT := ${hirakataQuizOptionsCount};
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
    for (const h of hirakatas) {
      delete h.created_at;
      delete h.updated_at;
    }
    const randomInteger = getRandomInt(0, hirakatas.length - 1);
    return {
      randomInteger,
      question: hirakatas[randomInteger],
      options: hirakatas
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getQuizKanji(school = null, jlpt = null) {
  try {
    const manager = getManager();
    let sqlQuery = `
      DO $$
      DECLARE
        random_number DOUBLE PRECISION;
        select_count BIGINT := ${kanjiQuizOptionsCount};
        total_data BIGINT;
        max_select BIGINT;
      BEGIN
        SELECT RANDOM()
          INTO random_number;
        SELECT COUNT(*)
          INTO total_data
          FROM kanji
    `;
    if (school == null && jlpt == null) {
      sqlQuery += `
          WHERE translate <> '';
        max_select := total_data - select_count;
        DROP TABLE IF EXISTS kanji_all_quiz;
        CREATE TABLE kanji_all_quiz AS
          SELECT *
          FROM kanji
          WHERE translate <> ''
      `;
    } else if (school != null) {
      sqlQuery += `
          WHERE school::varchar(255) ILIKE '%${school}%';
        max_select := total_data - select_count;
        DROP TABLE IF EXISTS kanji_s${school}_quiz;
        CREATE TABLE kanji_s${school}_quiz AS
          SELECT *
          FROM kanji
          WHERE school::varchar(255) ILIKE '%${school}%'
      `;
    } else if (jlpt != null) {
      sqlQuery += `
          WHERE jlpt::varchar(255) ILIKE '%${jlpt}%';
        max_select := total_data - select_count;
        DROP TABLE IF EXISTS kanji_n${jlpt}_quiz;
        CREATE TABLE kanji_n${jlpt}_quiz AS
          SELECT *
          FROM kanji
          WHERE jlpt::varchar(255) ILIKE '%${jlpt}%'
      `;
    }
    sqlQuery += `
          OFFSET
            CASE
              WHEN FLOOR(random_number * total_data) >= max_select THEN max_select
              ELSE FLOOR(random_number * total_data)
            END
          LIMIT select_count;
      END $$
    `;
    let kanjis = await manager.query(sqlQuery);
    if (school == null && jlpt == null) {
      sqlQuery = `SELECT * FROM kanji_all_quiz`;
    } else if (school != null) {
      sqlQuery = `SELECT * FROM kanji_s${school}_quiz`;
    } else if (jlpt != null) {
      sqlQuery = `SELECT * FROM kanji_n${jlpt}_quiz`;
    }
    kanjis = await manager.query(sqlQuery);
    for (const k of kanjis) {
      delete k.created_at;
      delete k.updated_at;
    }
    const randomInteger = getRandomInt(0, kanjis.length - 1);
    return {
      randomInteger,
      question: kanjis[randomInteger],
      options: kanjis
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
