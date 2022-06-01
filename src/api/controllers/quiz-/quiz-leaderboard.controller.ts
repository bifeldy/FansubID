import { Controller, Get, HttpCode, HttpException, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

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
  async getAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const maxPage = parseInt(req.query['page'] as string) || 0;
      const maxRow = parseInt(req.query['row'] as string) || 10;
      const leaderboard = await this.userRepo.query(`
        SELECT
          row_number() over(ORDER BY p.points DESC) as rank,
          u.username,
          u.email,
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
      `, [
        ((maxRow > 0 && maxRow <= 500) ? maxRow : 10),
        ((maxPage > 0) ? (maxPage * maxRow - maxRow) : 0)
      ]);
      const count = leaderboard.length || 0;
      return {
        info: `😅 200 - Leaderboard API :: List Rank 🤣`,
        count,
        pages: Math.ceil(count / (maxRow ? maxRow : 10)),
        results: leaderboard
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
