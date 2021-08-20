import { UsersModule } from './users/user.module';
import { ChatsModule } from './chats/chats.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
    imports: [ChatsModule, UsersModule],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
