import { PrismaSerivce } from './prisma.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
    providers: [PrismaSerivce],
    exports: [PrismaSerivce],
})
export class PrismaModule {}
