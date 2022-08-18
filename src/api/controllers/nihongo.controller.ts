import { Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Equal, ILike } from 'typeorm';

import { RoleModel, UserModel } from '../../models/req-res.model';

import { Roles } from '../decorators/roles.decorator';
import { VerifiedOnly } from '../decorators/verified.decorator';

import { NihongoService } from '../repository/nihongo.service';

@Controller('/nihongo')
export class NihongoController {

  constructor(
    private nihongoRepo: NihongoService
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  async getAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const [kanas, count] = await this.nihongoRepo.findAndCount({
        where: [
          {
            romaji: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`),
            category: ILike(`%${req.query['category'] ? req.query['category'] : ''}%`)
          },
          {
            kana: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`),
            category: ILike(`%${req.query['category'] ? req.query['category'] : ''}%`)
          },
          {
            meaning: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`),
            category: ILike(`%${req.query['category'] ? req.query['category'] : ''}%`)
          }
        ],
        order: {
          ...((req.query['sort'] && req.query['order']) ? {
            [req.query['sort'] as string]: (req.query['order'] as string).toUpperCase()
          } : {
            created_at: 'DESC',
            romaji: 'ASC'
          })
        },
        relations: ['user_'],
        skip: queryPage > 0 ? (queryPage * queryRow - queryRow) : 0,
        take: (queryRow > 0 && queryRow <= 500) ? queryRow : 10
      });
      for (const k of kanas) {
        if ('user_' in k && k.user_) {
          delete k.user_.email;
          delete k.user_.password;
          delete k.user_.session_token;
          delete k.user_.created_at;
          delete k.user_.updated_at;
        }
      }
      return {
        info: `😅 200 - Nihongo Kana API :: List All '${req.query['category'] ? req.query['category'] : ''}' 🤣`,
        count,
        pages: Math.ceil(count / (queryRow ? queryRow : 10)),
        results: kanas
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Nihongo Kana API :: Gagal Mendapatkan All Kanas 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/')
  @HttpCode(201)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  @VerifiedOnly()
  async addNew(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if (
        'romaji' in req.body &&
        'kana' in req.body &&
        'meaning' in req.body &&
        'category' in req.body &&
        'image' in req.body
      ) {
        const user: UserModel = res.locals['user'];
        const kana = this.nihongoRepo.new();
        kana.romaji = req.body.romaji;
        kana.kana = req.body.kana;
        kana.meaning = req.body.meaning;
        kana.category = req.body.category;
        kana.image_url = req.body.image;
        if ('audio' in req.body) {
          kana.audio = req.body.audio;
        }
        kana.user_ = user;
        const resKanaSave = await this.nihongoRepo.save(kana);
        if ('user_' in resKanaSave && resKanaSave.user_) {
          delete resKanaSave.user_.email;
          delete resKanaSave.user_.password;
          delete resKanaSave.user_.session_token;
          delete resKanaSave.user_.created_at;
          delete resKanaSave.user_.updated_at;
        }
        return {
          info: `😅 201 - Nihongo Kana API :: Tambah Baru 🤣`,
          result: resKanaSave
        };
      } else {
        throw new Error('Data Tidak Lengkap!');
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - Nihongo Kana API :: Gagal Menambah Kana Baru 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:id')
  @HttpCode(200)
  async getById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const kana = await this.nihongoRepo.findOneOrFail({
        where: [
          { id: Equal(parseInt(req.params['id'])) }
        ],
        relations: ['user_'],
      });
      if ('user_' in kana && kana.user_) {
        delete kana.user_.email;
        delete kana.user_.password;
        delete kana.user_.session_token;
        delete kana.user_.created_at;
        delete kana.user_.updated_at;
      }
      return {
        info: `😅 200 - Nihongo Kana API :: Detail ${req.params['id']} 🤣`,
        result: kana
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Nihongo Kana API :: Gagal Mencari Nihongo Kana ${req.params['id']} 😪`,
        result: {
          message: 'Nihongo Kana Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Put('/:id')
  @HttpCode(201)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  @VerifiedOnly()
  async updateById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if (
        'romaji' in req.body ||
        'kana' in req.body ||
        'meaning' in req.body ||
        'category' in req.body ||
        'image' in req.body
      ) {
        const user: UserModel = res.locals['user'];
        const kana = await this.nihongoRepo.findOneOrFail({
          where: [
            { id: Equal(parseInt(req.params['id'])) }
          ],
          relations: ['user_']
        });
        if ('romaji' in req.body) {
          kana.romaji = req.body.romaji;
        }
        if ('kana' in req.body) {
          kana.kana = req.body.kana;
        }
        if ('meaning' in req.body) {
          kana.meaning = req.body.meaning;
        }
        if ('category' in req.body) {
          kana.category = req.body.category;
        }
        if ('image' in req.body) {
          kana.image_url = req.body.image;
        }
        if ('audio' in req.body) {
          kana.audio = req.body.audio;
        }
        kana.user_ = user;
        const resKanaSave = await this.nihongoRepo.save(kana);
        if ('user_' in resKanaSave && resKanaSave.user_) {
          delete resKanaSave.user_.email;
          delete resKanaSave.user_.password;
          delete resKanaSave.user_.session_token;
          delete resKanaSave.user_.created_at;
          delete resKanaSave.user_.updated_at;
        }
        return {
          info: `😅 201 - Nihongo Kana API :: Ubah ${req.params['id']} 🤣`,
          result: resKanaSave
        };
      } else {
        throw new HttpException({
          info: `🙄 400 - Nihongo Kana API :: Gagal Mengubah Kana ${req.params['id']} 😪`,
          result: {
            message: 'Data Tidak Lengkap!'
          }
        }, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Nihongo Kana API :: Gagal Mencari Nihongo Kana ${req.params['id']} 😪`,
        result: {
          message: 'Nihongo Kana Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Delete('/:id')
  @HttpCode(202)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  async deleteById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const kana =  await this.nihongoRepo.findOneOrFail({
        where: [
          { id: Equal(parseInt(req.params['id'])) }
        ]
      });
      const deletedKana = await this.nihongoRepo.remove(kana);
      if ('user_' in deletedKana && deletedKana.user_) {
        delete deletedKana.user_.email;
        delete deletedKana.user_.password;
        delete deletedKana.user_.session_token;
        delete deletedKana.user_.created_at;
        delete deletedKana.user_.updated_at;
      }
      return {
        info: `😅 202 - Nihongo Kana API :: Berhasil Menghapus Kana ${req.params['id']} 🤣`,
        result: deletedKana
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Nihongo Kana API :: Gagal Mencari Nihongo Kana ${req.params['id']} 😪`,
        result: {
          message: 'Nihongo Kana Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

}
