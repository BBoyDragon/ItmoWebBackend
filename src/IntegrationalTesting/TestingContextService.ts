import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class TestingContextService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
  ) {
  }

  isTesting(): boolean {
    return this.request['isTesting'] === true;
  }
}
