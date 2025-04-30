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
  }
}
