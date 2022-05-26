import { Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Equal } from 'typeorm';

import { RoleModel } from '../../models/req-res.model';

import { Roles } from '../decorators/roles.decorator';

import { ProjectTypeService } from '../repository/project-type.service';

@Controller('/project-type')
export class ProjectTypeController {

  constructor(
    private projectTypeRepo: ProjectTypeService
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  async getAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const [projects, count] = await this.projectTypeRepo.findAndCount({
      order: {
        name: 'ASC'
      }
    });
    return {
      info: `😅 200 - Project API :: List All 🤣`,
      count,
      pages: 1,
      results: projects
    };
  }

  @Post('/')
  @HttpCode(201)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  async addNew(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if (
        'name' in req.body
      ) {
        const project = this.projectTypeRepo.new();
        project.name = req.body.name;
        if (req.body.image) {
          project.image_url = req.body.image;
        }
        if (req.body.description) {
          project.description = req.body.description;
        }
        const resProjectSave = await this.projectTypeRepo.save(project);
        return {
          info: `😅 201 - Project API :: Tambah Baru 🤣`,
          result: resProjectSave
        };
      } else {
        throw new Error('Data Tidak Lengkap!');
      }
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
  async getById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const projectType = await this.projectTypeRepo.findOneOrFail({
        where: [
          { id: Equal(parseInt(req.params['id'])) }
        ]
      });
      return {
        info: `😅 200 - Project API :: Detail ${req.params['id']} 🤣`,
        result: projectType
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
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  async updateById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if (
        'name' in req.body || 'description' in req.body || 'image' in req.body
        ) {
        const projectType = await this.projectTypeRepo.findOneOrFail({
          where: [
            { id: Equal(parseInt(req.params['id'])) }
          ]
        });
        if (req.body.name) {
          projectType.name = req.body.neam;
        }
        if (req.body.description) {
          projectType.description = req.body.description;
        }
        if (req.body.image) {
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
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  async deleteById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const projectType =  await this.projectTypeRepo.findOneOrFail({
        where: [
          { id: Equal(parseInt(req.params['id'])) }
        ]
      });
      const deletedProject = await this.projectTypeRepo.remove(projectType);
      return {
        info: `😅 202 - Project API :: Berhasil Menghapus Project ${req.params['id']} 🤣`,
        result: deletedProject
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

}
