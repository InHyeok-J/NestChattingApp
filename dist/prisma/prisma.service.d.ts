import { INestApplication, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class PrismaSerivce extends PrismaClient implements OnModuleInit {
    onModuleInit(): Promise<void>;
    enableShutdownHooks(app: INestApplication): Promise<void>;
}
