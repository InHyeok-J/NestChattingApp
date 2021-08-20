import { PrismaModule } from './../prisma/prisma.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { UserRepository } from 'src/repository/userRepository';

@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    providers: [UserService, UserRepository],
})
export class UsersModule {}
