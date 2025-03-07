import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { File as MulterFile } from 'multer';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { MediaService } from '../services/media.service';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
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
    const fileUrl = await this.mediaService.uploadFile(file);
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
    const fileUrls = await this.mediaService.uploadMultipleFiles(files);
    return { urls: fileUrls };
  }
}
