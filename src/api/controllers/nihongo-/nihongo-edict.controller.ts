import { Controller, Get, HttpCode, HttpException, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Equal, Raw } from 'typeorm';

// import { VerifiedOnly } from '../../decorators/verified.decorator';

import { EdictService } from '../../repository/edict.service';

@Controller('/nihongo-edict')
export class NihongoEdictController {

  constructor(
    private edictRepo: EdictService
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  async getAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const [edicts, count] = await this.edictRepo.findAndCount({
        where: [
          {
            kanji: Raw(column => `
                (kanji ILIKE :query OR reading ILIKE :query OR meaning ILIKE :query)
                AND jlpt::varchar(255) ILIKE :jlpt
              `, {
                query: `%${req.query['q'] ? req.query['q'] : ''}%`,
                jlpt: `%${req.query['jlpt'] ? req.query['jlpt'] : ''}%`
              }
            )
          }
        ],
        order: {
          ...((req.query['sort'] && req.query['order']) ? {
            [req.query['sort'] as string]: (req.query['order'] as string).toUpperCase()
          } : {
            created_at: 'DESC',
            id: 'ASC'
          })
        },
        skip: queryPage > 0 ? (queryPage * queryRow - queryRow) : 0,
        take: (queryRow > 0 && queryRow <= 500) ? queryRow : 10
      });
      return {
        info: `😅 200 - Edict API :: List All 🤣`,
        count,
        pages: Math.ceil(count / (queryRow ? queryRow : 10)),
        results: edicts
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Edict API :: Gagal Mendapatkan All Edicts 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  // @Post('/')
  // @HttpCode(201)
  // @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  // @VerifiedOnly()
  // async addNew(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
  //   try {
  //     if (
  //       'jlpt' in req.body &&
  //       'kanji' in req.body &&
  //       'meaning' in req.body &&
  //       'reading' in req.body
  //     ) {
  //       const edict = this.edictRepo.new();
  //       edict.jlpt = req.body.jlpt;
  //       edict.kanji = req.body.kanji;
  //       edict.meaning = req.body.meaning;
  //       edict.reading = req.body.reading;
  //       if ('flags' in req.body) {
  //         edict.flags = req.body.flags;
  //       }
  //       const resKanaSave = await this.edictRepo.save(edict);
  //       return {
  //         info: `😅 201 - Edict API :: Tambah Baru 🤣`,
  //         result: resKanaSave
  //       };
  //     } else {
  //       throw new Error('Data Tidak Lengkap!');
  //     }
  //   } catch (error) {
  //     if (error instanceof HttpException) throw error;
  //     throw new HttpException({
  //       info: '🙄 400 - Edict API :: Gagal Menambah Edict Baru 😪',
  //       result: {
  //         message: 'Data Tidak Lengkap!'
  //       }
  //     }, HttpStatus.BAD_REQUEST);
  //   }
  // }

  @Get('/:id')
  @HttpCode(200)
  async getById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const edict = await this.edictRepo.findOneOrFail({
        where: [
          { id: Equal(parseInt(req.params['id'])) }
        ]
      });
      return {
        info: `😅 200 - Edict API :: Detail ${req.params['id']} 🤣`,
        result: edict
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Edict API :: Gagal Mencari Edict ${req.params['id']} 😪`,
        result: {
          message: 'Edict Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

  // @Put('/:id')
  // @HttpCode(201)
  // @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  // @VerifiedOnly()
  // async updateById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
  //   try {
  //     if (
  //       'jlpt' in req.body ||
  //       'kanji' in req.body ||
  //       'meaning' in req.body ||
  //       'reading' in req.body
  //     ) {
  //       const edict = await this.edictRepo.findOneOrFail({
  //         where: [
  //           { id: Equal(parseInt(req.params['id'])) }
  //         ]
  //       });
  //       if ('jlpt' in req.body) {
  //         edict.jlpt = req.body.jlpt;
  //       }
  //       if ('kanji' in req.body) {
  //         edict.kanji = req.body.kanji;
  //       }
  //       if ('meaning' in req.body) {
  //         edict.meaning = req.body.meaning;
  //       }
  //       if ('reading' in req.body) {
  //         edict.reading = req.body.reading;
  //       }
  //       if ('flags' in req.body) {
  //         edict.flags = req.body.flags;
  //       }
  //       const resEdictSave = await this.edictRepo.save(edict);
  //       return {
  //         info: `😅 201 - Edict API :: Ubah ${req.params['id']} 🤣`,
  //         result: resEdictSave
  //       };
  //     } else {
  //       throw new HttpException({
  //         info: `🙄 400 - Edict API :: Gagal Mengubah Edict ${req.params['id']} 😪`,
  //         result: {
  //           message: 'Data Tidak Lengkap!'
  //         }
  //       }, HttpStatus.BAD_REQUEST);
  //     }
  //   } catch (error) {
  //     if (error instanceof HttpException) throw error;
  //     throw new HttpException({
  //       info: `🙄 404 - Edict API :: Gagal Mencari Edict ${req.params['id']} 😪`,
  //       result: {
  //         message: 'Edict Tidak Ditemukan!'
  //       }
  //     }, HttpStatus.NOT_FOUND);
  //   }
  // }

  // @Delete('/:id')
  // @HttpCode(202)
  // @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  // @VerifiedOnly()
  // async deleteById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
  //   try {
  //     const edict =  await this.edictRepo.findOneOrFail({
  //       where: [
  //         { id: Equal(parseInt(req.params['id'])) }
  //       ]
  //     });
  //     const deletedEdict = await this.edictRepo.remove(edict);
  //     return {
  //       info: `😅 202 - Edict API :: Berhasil Menghapus Kana ${req.params['id']} 🤣`,
  //       result: deletedEdict
  //     };
  //   } catch (error) {
  //     if (error instanceof HttpException) throw error;
  //     throw new HttpException({
  //       info: `🙄 404 - Edict API :: Gagal Mencari Edict ${req.params['id']} 😪`,
  //       result: {
  //         message: 'Edict Tidak Ditemukan!'
  //       }
  //     }, HttpStatus.NOT_FOUND);
  //   }
  // }

}
