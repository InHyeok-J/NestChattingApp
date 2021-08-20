import { UserRepository } from 'src/repository/userRepository';
import { ChatRepository } from './../repository/chatRepository';
import { Logger } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'chatting' })
export class ChatsGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    constructor(
        private readonly chatRepository: ChatRepository,
        private readonly userRepository: UserRepository,
    ) {}
    private logger = new Logger('chat');

    @SubscribeMessage('new_user')
    async handleNewUser(
        @MessageBody() username: string,
        @ConnectedSocket() socket: Socket,
    ) {
        console.log(username);
        const Namespace = socket.nsp.name;
        console.log(Namespace);
        //username으로 user를 찾아서 id값을 가져옴
        const exUser = await this.userRepository.findByUsername(username);
        console.log(exUser);
        //채팅방을 찾고
        const exChatting = await this.chatRepository.findByChatName(Namespace);

        //찾은 채팅방에 user가 없으면 socketid와 username을 업데이트 해줌.
        const JoinChattingCheck = await this.chatRepository.findByUserName(
            exChatting[0].id,
            username,
        );
        if (!JoinChattingCheck[0]) {
            console.log('테스트', exChatting[0].id, exUser[0].id);
            await this.chatRepository.updateChatUser(
                exChatting[0].id,
                socket.id,
                exUser[0].id,
            );
        }

        socket.broadcast.emit('user_connected', username);
        return username;
    }

    @SubscribeMessage('submit_chat')
    async handleSubmitChat(
        @MessageBody() chat: string,
        @ConnectedSocket() socket: Socket,
    ) {
        const findUserName = await this.userRepository.findBySocketId(
            socket.id,
        );
        const Namespace = socket.nsp.name;
        console.log(Namespace);
        const exChatting = await this.chatRepository.findByChatName(Namespace);

        const StackChatting = await this.chatRepository.updateChattingStack(
            exChatting[0].id,
            findUserName[0].id,
            chat,
        );

        socket.broadcast.emit('new_chat', {
            chat,
            username: findUserName[0].name,
        });
    }

    afterInit() {
        //게이트웨이가 실행이 될때 가장 먼저 실행됨.
        //생성자 다음으로 실행이 되며, 생성자가 실행된 후에 들어갈 로직이 있으면 된다.
        this.logger.log('init');
    }

    async handleConnection(@ConnectedSocket() socket: Socket) {
        //nsp -> namespace.
        const Namespace = socket.nsp.name;
        const exChatting = await this.chatRepository.findByChatName(Namespace);
        if (!exChatting[0]) {
            await this.chatRepository.createChat(Namespace);
        }
        this.logger.log(`connented : ${socket.id} ${socket.nsp.name}`);
    }

    async handleDisconnect(@ConnectedSocket() socket: Socket) {
        const findUserName = await this.userRepository.findBySocketId(
            socket.id,
        );
        const Namespace = socket.nsp.name;
        console.log(Namespace);
        const exChatting = await this.chatRepository.findByChatName(Namespace);

        await this.chatRepository.deleteChattingUser(
            exChatting[0].id,
            findUserName[0].id,
        );
        this.logger.log(`disconnented : ${socket.id} ${socket.nsp.name}`);
    }
}
