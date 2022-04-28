import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = {
  fileFilter: (_: Request, file: Express.Multer.File, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      return callback(null, true);
    }
    return callback(
      new BadRequestException('지원하지 않는 이미지 형식입니다.'),
      false,
    );
  },

  storage: diskStorage({
    destination: (_req, _file, callback) => {
      const uploadPath = 'uploads';
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      callback(null, uploadPath);
    },
    filename: (_req, file, callback) => {
      callback(null, `${Date.now()}${extname(file.originalname)}`);
    },
  }),

  limits: {
    fieldNameSize: 200, // 필드명 사이즈 최대값 (기본값 100bytes)
    filedSize: 1024 * 1024, // 필드 사이즈 값 설정 (기본값 1MB)
    fields: 2, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
    fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
    files: 1, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
  },
};

export const uploadFileUrl = (filename: string): string =>
  `http://localhost:5000/${filename}`;
