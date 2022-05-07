import { Controller, Get, HttpCode, HttpException, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ILike, IsNull } from 'typeorm';

import { LessonService } from '../../repository/lesson.service';

@Controller('/nihongo-lesson')
export class NihongoLessonController {

  constructor(
    private lessonRepo: LessonService
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  async getAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const [lesson, count] = await this.lessonRepo.findAndCount({
        where: [
          {
            title: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`),
            parent_lesson_: IsNull()
          }
        ],
        order: {
          ...((req.query['sort'] && req.query['order']) ? {
            [req.query['sort'] as string]: (req.query['order'] as string).toUpperCase()
          } : {
            created_at: 'DESC',
            title: 'ASC'
          })
        },
        relations: ['user_'],
        skip: queryPage > 0 ? (queryPage * queryRow - queryRow) : 0,
        take: (queryRow > 0 && queryRow <= 500) ? queryRow : 10
      });
      for (const l of lesson) {
        delete l.content;
        if ('user_' in l && l.user_) {
          delete l.user_.role;
          delete l.user_.password;
          delete l.user_.session_token;
          delete l.user_.created_at;
          delete l.user_.updated_at;
        }
      }
      return {
        info: `😅 200 - Lesson API :: List All 🤣`,
        count,
        pages: Math.ceil(count / (queryRow ? queryRow : 10)),
        results: lesson
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Lesson API :: Gagal Mendapatkan All Lesson 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  // TODO :: Minna の Lesson を取得する

}
