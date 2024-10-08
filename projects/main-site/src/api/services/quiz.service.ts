// NodeJS Library
import cluster from 'node:cluster';

import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { QuizCategoryModel, QuizHirakataModel, QuizKanjiModel, QuizModel } from '../../models/quiz.model';
import { RoomInfoInOutModel } from '../../models/socket-io.model';

import { ConfigService } from './config.service';
import { ClusterMasterSlaveService } from './cluster-master-slave.service';
import { GlobalService } from './global.service';

@Injectable()
export class QuizService {

  // private quiz: QuizRoom = {};

  constructor(
    @InjectEntityManager() private manager: EntityManager,
    private cms: ClusterMasterSlaveService,
    private cfg: ConfigService,
    private gs: GlobalService
  ) {
    //
  }

  async cfgQuizRoomShowQuestion(roomId: string): Promise<QuizModel<any>> {
    if (cluster.isMaster) {
      return this.cfg.quizRoomShowQuestion(roomId);
    } else {
      return await this.cms.sendMessageToMaster('CFG_ROOM_SHOW_QUESTION', roomId);
    }
  }

  async cfgQuizRoomCreateQuestion(roomId: string, question: QuizModel<any>): Promise<QuizModel<any>> {
    if (cluster.isMaster) {
      return this.cfg.quizRoomCreateQuestion(roomId, question);
    } else {
      return await this.cms.sendMessageToMaster('CFG_ROOM_CREATE_QUESTION', { roomId, question });
    }
  }

  /** */
  
  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
    this.gs.log('[QUIZ_SERVICE-QUESTION_ID] 🎭', rand);
    return rand;
  }

  async getQuizHirakata(): Promise<QuizHirakataModel> {
    try {
      let hirakatas = await this.manager.query(`
        DO $$
          DECLARE
            random_number DOUBLE PRECISION;
            select_count BIGINT := ${CONSTANTS.quizOptionsCountHirakata};
            total_data BIGINT;
            max_select BIGINT;
          BEGIN
            SELECT
              RANDOM()
            INTO
              random_number
            ;
            SELECT
              COUNT(*)
            INTO
              total_data
            FROM
              hirakata
            WHERE
              hiragana IS NOT NULL AND
              hiragana <> '' AND
              katakana IS NOT NULL AND
              katakana <> ''
            ;
            max_select := total_data - select_count;
            DROP TABLE IF EXISTS hirakata_quiz;
            CREATE TABLE hirakata_quiz AS
              SELECT
                romaji,
                hiragana,
                katakana,
                category,
                segment,
                created_at,
                updated_at
              FROM
                hirakata
              WHERE
                hiragana IS NOT NULL AND
                hiragana <> '' AND
                katakana IS NOT NULL AND
                katakana <> ''
              OFFSET
                CASE
                  WHEN FLOOR(random_number * total_data) >= max_select
                    THEN max_select
                  ELSE
                    FLOOR(random_number * total_data)
                END
              LIMIT
                select_count
              ;
        END $$
      `);
      hirakatas = await this.manager.query(`
        SELECT
          romaji,
          hiragana,
          katakana,
          category,
          segment,
          created_at,
          updated_at
        FROM
          hirakata_quiz
      `);
      for (const h of hirakatas) {
        delete h.created_at;
        delete h.updated_at;
      }
      const randomInteger = this.getRandomInt(0, hirakatas.length - 1);
      return {
        randomInteger,
        question: hirakatas[randomInteger],
        options: hirakatas
      };
    } catch (error) {
      this.gs.log('[QUIZ_SERVICE-GET_HIRAKATA] 🏁', error, 'error');
      return null;
    }
  }

  async getQuizCategory(category: string): Promise<QuizCategoryModel> {
    try {
      let nihongo = await this.manager.query(`
        DO $$
          DECLARE
            random_number DOUBLE PRECISION;
            select_count BIGINT := ${CONSTANTS.quizOptionsCountCategory};
            total_data BIGINT;
            max_select BIGINT;
          BEGIN
            SELECT
              RANDOM()
            INTO
              random_number
            ;
            SELECT
              COUNT(*)
            INTO
              total_data
            FROM
              nihongo
            WHERE
              category ILIKE '%${category}%'
            ;
            max_select := total_data - select_count;
            DROP TABLE IF EXISTS nihongo_${category}_quiz;
            CREATE TABLE nihongo_${category}_quiz AS
              SELECT
                id,
                romaji,
                kana,
                meaning,
                category,
                audio,
                image_url,
                user_id,
                created_at,
                updated_at
              FROM
                nihongo
              WHERE
                category ILIKE '%${category}%'
              OFFSET
                CASE
                  WHEN FLOOR(random_number * total_data) >= max_select
                  THEN max_select
                  ELSE
                  FLOOR(random_number * total_data)
                END
              LIMIT 
                select_count
              ;
        END $$
      `);
      nihongo = await this.manager.query(`
        SELECT
          id,
          romaji,
          kana,
          meaning,
          category,
          audio,
          image_url,
          user_id,
          created_at,
          updated_at
        FROM
          nihongo_${category}_quiz
      `);
      for (const h of nihongo) {
        delete h.created_at;
        delete h.updated_at;
        delete h.user_id;
        if (h.image_url?.startsWith('http') && this.gs.includesOneOf(h.image_url, environment.ipoChanProxyUrl)) {
          h.image_url = `https://crawl.${environment.domain}/?url=${encodeURIComponent(h.image_url)}`;
        }
      }
      const randomInteger = this.getRandomInt(0, nihongo.length - 1);
      return {
        randomInteger,
        question: nihongo[randomInteger],
        options: nihongo
      };
    } catch (error) {
      this.gs.log('[QUIZ_SERVICE-GET_NIHONGO] 🏁', error, 'error');
      return null;
    }
  }

  async getQuizKanji(school = null, jlpt = null): Promise<QuizKanjiModel> {
    try {
      let sqlQuery = `
        DO $$
        DECLARE
          random_number DOUBLE PRECISION;
          select_count BIGINT := ${CONSTANTS.quizOptionsCountKanji};
          total_data BIGINT;
          max_select BIGINT;
        BEGIN
          SELECT RANDOM()
            INTO random_number;
          SELECT COUNT(*)
            INTO total_data
            FROM kanji
      `;
      if (school === null && jlpt === null) {
        sqlQuery += `
            WHERE translate <> '';
          max_select := total_data - select_count;
          DROP TABLE IF EXISTS kanji_all_quiz;
          CREATE TABLE kanji_all_quiz AS
            SELECT *
            FROM kanji
            WHERE translate <> ''
        `;
      } else if (school !== null) {
        sqlQuery += `
            WHERE school::varchar(255) ILIKE '%${school}%';
          max_select := total_data - select_count;
          DROP TABLE IF EXISTS kanji_s${school}_quiz;
          CREATE TABLE kanji_s${school}_quiz AS
            SELECT *
            FROM kanji
            WHERE school::varchar(255) ILIKE '%${school}%'
        `;
      } else if (jlpt !== null) {
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
      let kanjis = await this.manager.query(sqlQuery);
      if (school === null && jlpt === null) {
        sqlQuery = `SELECT * FROM kanji_all_quiz`;
      } else if (school !== null) {
        sqlQuery = `SELECT * FROM kanji_s${school}_quiz`;
      } else if (jlpt !== null) {
        sqlQuery = `SELECT * FROM kanji_n${jlpt}_quiz`;
      }
      kanjis = await this.manager.query(sqlQuery);
      for (const k of kanjis) {
        delete k.created_at;
        delete k.updated_at;
      }
      const randomInteger = this.getRandomInt(0, kanjis.length - 1);
      return {
        randomInteger,
        question: kanjis[randomInteger],
        options: kanjis
      };
    } catch (error) {
      this.gs.log('[QUIZ_SERVICE-GET_KANJI] 🏁', error, 'error');
      return null;
    }
  }

  async getNewQuestion(roomId: string): Promise<QuizModel<any>> {
    switch (roomId) {
      case '/nihongo/hiragana':
      case '/nihongo/katakana':
        return await this.cfgQuizRoomCreateQuestion(roomId, await this.getQuizHirakata());
      case '/nihongo/kelas-lanjutan-2':
        return await this.cfgQuizRoomCreateQuestion(roomId, await this.getQuizKanji('9', null));
      case '/nihongo/kelas-lanjutan-1':
        return await this.cfgQuizRoomCreateQuestion(roomId, await this.getQuizKanji('8', null));
      case '/nihongo/kelas-6':
      case '/nihongo/kelas-5':
      case '/nihongo/kelas-4':
      case '/nihongo/kelas-3':
      case '/nihongo/kelas-2':
      case '/nihongo/kelas-1':
        const schoolLevel = roomId.split('-').pop()[0];
        return await this.cfgQuizRoomCreateQuestion(roomId, await this.getQuizKanji(schoolLevel, null));
      case '/nihongo/jlpt-n5':
      case '/nihongo/jlpt-n4':
      case '/nihongo/jlpt-n3':
      case '/nihongo/jlpt-n2':
      case '/nihongo/jlpt-n1':
        const jlptLevel = roomId.split('-').pop()[1];
        return await this.cfgQuizRoomCreateQuestion(roomId, await this.getQuizKanji(null, jlptLevel));
      case '/nihongo/semua-kanji':
        return await this.cfgQuizRoomCreateQuestion(roomId, await this.getQuizKanji(null, null));
      default:
        if (roomId.startsWith('/nihongo/latihan-')) {
          const categoryUrl = roomId.split('-').pop();
          const categoryDb = await this.manager.query(`SELECT DISTINCT category FROM nihongo`);
          const availableCategory: string[] = categoryDb.map(c => c.category);
          if (availableCategory.includes(categoryUrl)) {
            return this.cfgQuizRoomCreateQuestion(roomId, await this.getQuizCategory(categoryUrl));
          }
        }
        throw new Error('Kuis Tidak Tersedia!');
    }
  }

  async calculatePoints(data: RoomInfoInOutModel): Promise<number> {
    const quiz: QuizModel<any> = await this.cfgQuizRoomShowQuestion(data.roomId);
    const question = quiz.question;
    let points = 1;
    if (question.jlpt === 0) {
      points = 64;
    } else if (question.jlpt) {
      // n5 = 2, n4 = 4, n3 = 8, n2 = 16, n1 = 32
      const totalPangkat = (Math.abs(question.jlpt - 5) + 1);
      let hasilPangkatDua = 1;
      for (let i = 0; i < totalPangkat; i++) {
        hasilPangkatDua = hasilPangkatDua * 2;
      }
      points = hasilPangkatDua;
    } else if (question.category) {
      points = 4;
    }
    // TODO :: Quiz Lain
    return points;
  }

}
