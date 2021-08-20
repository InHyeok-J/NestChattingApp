import { UserRepository } from 'src/repository/userRepository';
import { ChatRepository } from './../repository/chatRepository';
import { PrismaModule } from './../prisma/prisma.module';
import { ChatsGateway } from './chats.gateway';
import { Module } from '@nestjs/common';

@Module({
    imports: [PrismaModule],
    providers: [ChatsGateway, ChatRepository, UserRepository],
})
export class ChatsModule {}
