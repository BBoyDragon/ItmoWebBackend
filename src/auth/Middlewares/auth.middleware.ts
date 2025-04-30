import { Injectable, NestMiddleware } from '@nestjs/common';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    verifySession()(req, res, next);
  }
}
