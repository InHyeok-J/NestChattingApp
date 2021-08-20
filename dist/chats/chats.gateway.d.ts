import { UserRepository } from 'src/repository/userRepository';
import { ChatRepository } from './../repository/chatRepository';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket } from 'socket.io';
export declare class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly chatRepository;
    private readonly userRepository;
    constructor(chatRepository: ChatRepository, userRepository: UserRepository);
    private logger;
    handleNewUser(username: string, socket: Socket): Promise<string>;
    handleSubmitChat(chat: string, socket: Socket): Promise<void>;
    afterInit(): void;
    handleConnection(socket: Socket): Promise<void>;
    handleDisconnect(socket: Socket): Promise<void>;
}
