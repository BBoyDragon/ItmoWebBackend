import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { Express } from 'express';

@Injectable()
export class FileStorageService {
  private readonly s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.YANDEX_ACCESS_KEY,
      secretAccessKey: process.env.YANDEX_SECRET_KEY,
      endpoint: 'https://storage.yandexcloud.net',
      region: 'ru-central1',
      s3ForcePathStyle: true,
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const bucket = process.env.YANDEX_BUCKET_NAME;
    if (!bucket) {
      throw new InternalServerErrorException('YANDEX_BUCKET_NAME is not defined');
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
