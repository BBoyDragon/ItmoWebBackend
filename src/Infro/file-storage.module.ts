import { Module } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { FileStorageService } from '../../src/Infro/file-storage.service';
import { FileStorageController } from './file-storage.controller';

@Module({
  controllers: [FileStorageController],
  providers: [FileStorageService],
  exports: [FileStorageService],
})
export class FileStorageModule {
  constructor() {
    AWS.config.update({
      region: 'ru-central1',
      accessKeyId: process.env.YANDEX_ACCESS_KEY,
      secretAccessKey: process.env.YANDEX_SECRET_KEY,
    });
  }
}
