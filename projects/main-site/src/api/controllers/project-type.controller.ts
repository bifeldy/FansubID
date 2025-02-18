import { Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Post, Put, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Equal } from 'typeorm';

import { RoleModel } from '../../models/req-res.model';

import { environment } from '../../environments/api/environment';

import { FilterApiKeyAccess } from '../decorators/filter-api-key-access.decorator';
import { Roles } from '../decorators/roles.decorator';
import { VerifiedOnly } from '../decorators/verified-only.decorator';

import { GlobalService } from '../services/global.service';

import { BerkasService } from '../repository/berkas.service';
import { ProjectTypeService } from '../repository/project-type.service';

@ApiExcludeController()
@Controller('/project-type')
export class ProjectTypeController {

  constructor(
    private gs: GlobalService,
    private berkasRepo: BerkasService,
    private projectTypeRepo: ProjectTypeService
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  @FilterApiKeyAccess()
  async getAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const projects = await this.projectTypeRepo.query(`
      SELECT
        SUM(total_berkas) total_berkas,
        x.id,
        x.name,
        x.description,
        x.image_url,
        x.created_at,
        x.updated_at
      FROM
        (
          SELECT
            0 total_berkas,
            p.*
          FROM
            project_types p
          UNION
          SELECT
            COUNT(b.id) total_berkas,
            p.*
          FROM
            berkas b,
            project_types p
          WHERE
            b."projectType_id" = p.id
          GROUP BY
            p.id
        ) x
      GROUP BY
        x.id,
        x.name,
        x.description,
        x.image_url,
        x.created_at,
        x.updated_at
      ORDER BY
        x.name ASC
    `);
    for (const p of projects) {
      if (p.image_url?.startsWith('http') && this.gs.includesOneOf(p.image_url, environment.ipoChanProxyUrl)) {
        p.image_url = `https://crawl.${environment.domain}/?url=${encodeURIComponent(p.image_url)}`;
      }
    }
    return {
      info: `😅 200 - Project API :: List All 🤣`,
      count: projects.length,
      pages: 1,
      results: projects
    };
  }

  @Post('/')
  @HttpCode(201)
  @FilterApiKeyAccess()
  @VerifiedOnly()
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  async addNew(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if (
        'name' in req.body
      ) {
        const project = this.projectTypeRepo.new();
        project.name = req.body.name;
        if ('image' in req.body) {
          project.image_url = req.body.image;
        }
        if ('description' in req.body) {
          project.description = req.body.description;
        }
        const resProjectSave = await this.projectTypeRepo.save(project);
        return {
          info: `😅 201 - Project API :: Tambah Baru 🤣`,
          result: resProjectSave
        };
      }
      throw new Error('Data Tidak Lengkap!');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - Project API :: Gagal Menambah Jenis Project Baru 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:id')
  @HttpCode(200)
  @FilterApiKeyAccess()
  async getById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const projectType = await this.projectTypeRepo.findOneOrFail({
        where: [
          { id: Equal(parseInt(req.params['id'])) }
        ]
      });
      const berkasCount = await this.berkasRepo.count({
        where: [
          {
            project_type_: {
              id: Equal(projectType.id)
            }
          }
        ],
        relations: ['project_type_']
      });
      return {
        info: `😅 200 - Project API :: Detail ${req.params['id']} 🤣`,
        result: {
          ...projectType,
          total_berkas: berkasCount
        }
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Project API :: Gagal Mencari Jenis Project ${req.params['id']} 😪`,
        result: {
          message: 'Jenis Project Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Put('/:id')
  @HttpCode(201)
  @FilterApiKeyAccess()
  @VerifiedOnly()
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  async updateById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if ('name' in req.body || 'description' in req.body || 'image' in req.body) {
        const projectType = await this.projectTypeRepo.findOneOrFail({
          where: [
            { id: Equal(parseInt(req.params['id'])) }
          ]
        });
        if ('name' in req.body) {
          projectType.name = req.body.name;
        }
        if ('description' in req.body) {
          projectType.description = req.body.description;
        }
        if ('image' in req.body) {
          projectType.image_url = req.body.image;
        }
        const resProjectTypeSave = await this.projectTypeRepo.save(projectType);
        return {
          info: `😅 201 - Project API :: Ubah ${req.params['id']} 🤣`,
          result: resProjectTypeSave
        };
      } else {
        throw new HttpException({
          info: `🙄 400 - Fansub API :: Gagal Mengubah Jenis Project ${req.params['id']} 😪`,
          result: {
            message: 'Data Tidak Lengkap!'
          }
        }, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Project API :: Gagal Mencari Jenis Project ${req.params['id']} 😪`,
        result: {
          message: 'Jenis Project Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Delete('/:id')
  @HttpCode(202)
  @FilterApiKeyAccess()
  @VerifiedOnly()
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  async deleteById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const projectType =  await this.projectTypeRepo.findOneOrFail({
        where: [
          { id: Equal(parseInt(req.params['id'])) }
        ]
      });
      const berkasCount = await this.berkasRepo.count({
        where: [
          {
            project_type_: {
              id: Equal(projectType.id)
            }
          }
        ],
        relations: ['project_type_']
      });
      if (berkasCount === 0) {
        const deletedProject = await this.projectTypeRepo.remove(projectType);
        return {
          info: `😅 202 - Project API :: Berhasil Menghapus Project ${req.params['id']} 🤣`,
          result: deletedProject
        };
      } else {
        throw new HttpException({
          info: `🙄 403 - Project API :: Gagal Menghapus Project ${req.params['id']} 😪`,
          result: {
            message: 'Ada Berkas Yang Terkait Dengan Kategori Ini!'
          }
        }, HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Project API :: Gagal Mencari Jenis Project ${req.params['id']} 😪`,
        result: {
          message: 'Jenis Project Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

}
