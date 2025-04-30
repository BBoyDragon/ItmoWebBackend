import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { Express } from 'express';

@Injectable()
export class FileStorageService {
  private s3 = new AWS.S3();

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const bucket = process.env.YANDEX_BUCKET_NAME;
    if (!bucket) {
      throw new InternalServerErrorException('YANDEX_BUCKET_NAME is not defined in environment variables');
    }

    const params = {
      Bucket: bucket,
      Key: `files/${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const uploadResult = await this.s3.upload(params).promise();
      return uploadResult.Location;
    } catch (error) {
      console.error('S3 upload failed:', error);
      throw new InternalServerErrorException('File upload failed');
    }
  }
}
