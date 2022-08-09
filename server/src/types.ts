import { IDatabaseDriver, Connection, EntityManager } from '@mikro-orm/core';
import { Redis } from 'ioredis';
import { Request, Response } from 'express';
export class MyContext {
  em: EntityManager<IDatabaseDriver<Connection>>;
  req: Request & { session: { userId: string } };
  res: Response;
  redis: Redis;
}

export interface SendChampResponse {
  status: string;
  code: string;
  message: string;
  data: {
    business_uid: string;
    reference: string;
  };
}
