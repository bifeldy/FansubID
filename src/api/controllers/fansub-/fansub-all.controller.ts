import { Controller, Get, HttpCode, HttpException, HttpStatus, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { FilterApiKeyAccess } from '../../decorators/filter-api-key-access.decorator';

import { FansubService } from '../../repository/fansub.service';

@ApiExcludeController()
@Controller('/fansub-all')
export class FansubAllController {

  constructor(
    private fansubRepo: FansubService
  ) {
    //
  }

  // GET `/api/fansub-all`
  @Get('/')
  @HttpCode(200)
  @FilterApiKeyAccess()
  async getAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const [fansubs, count] = await this.fansubRepo.findAndCount({
        order: {
          name: 'ASC',
          active: 'DESC'
        }
      });
      for (const f of fansubs) {
        (f as any).urls = JSON.parse(f.urls);
        (f as any).tags = JSON.parse(f.tags);
        delete f.description;
      }
      return {
        info: `😅 200 - Fansub API :: List All 🤣`,
        count,
        pages: 1,
        results: fansubs
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Fansub API :: Gagal Mendapatkan All Fansub 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
