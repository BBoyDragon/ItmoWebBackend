
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TestingFlagMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req['isTesting'] = req.headers['x-testing-enabled']?.toString().toLowerCase() === 'true';
    next();
  }
}
