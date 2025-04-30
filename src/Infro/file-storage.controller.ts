import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileStorageService } from './file-storage.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FileStorageController {
  constructor(private readonly fileStorageService: FileStorageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileUrl = await this.fileStorageService.uploadFile(file);
    return { fileUrl };
  }
}
