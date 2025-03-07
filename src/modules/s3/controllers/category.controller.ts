import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { S3Service } from '../services/s3.service';
import { File as MulterFile } from 'multer';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('S3')
@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data') // Swagger reconoce la subida de archivos
  @ApiBody({
    description: 'Sube un archivo a DigitalOcean Spaces',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(@UploadedFile() file: MulterFile) {
    const fileUrl = await this.s3Service.uploadFile(file);
    return { url: fileUrl };
  }

  @Post('upload-multiple')
  @UseInterceptors(FilesInterceptor('files', 10)) // Máximo 10 archivos
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Sube múltiples archivos a DigitalOcean Spaces',
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  async uploadMultipleFiles(@UploadedFiles() files: MulterFile[]) {
    const fileUrls = await this.s3Service.uploadMultipleFiles(files);
    return { urls: fileUrls };
  }
}
