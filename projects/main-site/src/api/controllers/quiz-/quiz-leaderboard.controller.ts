import { Controller, Get, HttpCode, HttpException, HttpStatus, Req, Res } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { CONSTANTS } from '../../../constants';

import { UserService } from '../../repository/user.service';

@Controller('/quiz-leaderboard')
export class QuizLeaderboardController {

  constructor(
    private userRepo: UserService
  ) {
    //
  }

  // GET `/api/quiz-leaderboard`
  @Get('/')
  @HttpCode(200)
  @ApiTags(CONSTANTS.apiTagQuiz)
  @ApiQuery({ name: 'row', required: false, type: 'number' })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  async getAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const maxPage = parseInt(req.query['page'] as string) || 0;
      const maxRow = parseInt(req.query['row'] as string) || 10;
      const leaderboards = await this.userRepo.query(`
        SELECT
          a.*,
          b.*
        FROM
          (
            SELECT
              count(*)
            FROM
              users u,
              profile p
            WHERE
              u.profile_id = p.id
          ) a,
          (
            SELECT
              row_number() over(ORDER BY p.points DESC, u.updated_at DESC) rank,
              u.username,
              u.image_url,
              p.points,
              p.created_at,
              p.updated_at
            FROM
              users u,
              profile p
            WHERE
              u.profile_id = p.id
            LIMIT
              $1
            OFFSET
              $2
          ) b
      `, [
        ((maxRow > 0 && maxRow <= 500) ? maxRow : 10),
        ((maxPage > 0) ? (maxPage * maxRow - maxRow) : 0)
      ]);
      let count = 0 || leaderboards.length;
      for (const l of leaderboards) {
        if ('count' in l) {
          if (l.count > count) {
            count = l.count;
          }
          delete l.count;
        }
      }
      return {
        info: `😅 200 - Leaderboard API :: List Rank 🤣`,
        count,
        pages: Math.ceil(count / (maxRow ? maxRow : 10)),
        results: leaderboards
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Leaderboard API :: Gagal Mendapatkan All Rank 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
