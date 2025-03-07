import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { File as MulterFile } from 'multer';
import { ConfigService } from '@nestjs/config';
import { ExceptionHandler } from 'src/helpers/handlers/exception.handler';

@Injectable()
export class S3Service {
  private s3: AWS.S3;
  private bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get<string>('DO_SPACES_KEY'),
      secretAccessKey: this.configService.get<string>('DO_SPACES_SECRET'),
      region: this.configService.get<string>('DO_SPACES_REGION'),
      endpoint: new AWS.Endpoint(this.configService.get<string>('DO_SPACES_ENDPOINT')!),
      s3ForcePathStyle: false,
    });

    this.bucketName = this.configService.get<string>('DO_SPACES_BUCKET')!;
  }

  async uploadFile(file: MulterFile): Promise<string> {
    try {
      const fileKey = `dagro/uploads/${uuidv4()}`;

      const params = {
        Bucket: this.bucketName,
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      };

      const uploadResult = await this.s3.upload(params).promise();
      return `${this.configService.get<string>('DO_SPACES_ENDPOINT')}/${this.bucketName}/${fileKey}`;
    } catch (error) {
      console.log(error);
      throw new ExceptionHandler(error);
    }
  }

  async uploadMultipleFiles(files: MulterFile[]): Promise<string[]> {
    try {
      return Promise.all(files.map((file) => this.uploadFile(file)));
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }
}
