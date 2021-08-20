"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatsGateway = void 0;
const userRepository_1 = require("../repository/userRepository");
const chatRepository_1 = require("./../repository/chatRepository");
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let ChatsGateway = class ChatsGateway {
    constructor(chatRepository, userRepository) {
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
        this.logger = new common_1.Logger('chat');
    }
    async handleNewUser(username, socket) {
        console.log(username);
        const Namespace = socket.nsp.name;
        console.log(Namespace);
        const exUser = await this.userRepository.findByUsername(username);
        console.log(exUser);
        const exChatting = await this.chatRepository.findByChatName(Namespace);
        const JoinChattingCheck = await this.chatRepository.findByUserName(exChatting[0].id, username);
        if (!JoinChattingCheck[0]) {
            console.log('테스트', exChatting[0].id, exUser[0].id);
            await this.chatRepository.updateChatUser(exChatting[0].id, socket.id, exUser[0].id);
        }
        socket.broadcast.emit('user_connected', username);
        return username;
    }
    async handleSubmitChat(chat, socket) {
        const findUserName = await this.userRepository.findBySocketId(socket.id);
        const Namespace = socket.nsp.name;
        console.log(Namespace);
        const exChatting = await this.chatRepository.findByChatName(Namespace);
        const StackChatting = await this.chatRepository.updateChattingStack(exChatting[0].id, findUserName[0].id, chat);
        socket.broadcast.emit('new_chat', {
            chat,
            username: findUserName[0].name,
        });
    }
    afterInit() {
        this.logger.log('init');
    }
    async handleConnection(socket) {
        const Namespace = socket.nsp.name;
        const exChatting = await this.chatRepository.findByChatName(Namespace);
        if (!exChatting[0]) {
            await this.chatRepository.createChat(Namespace);
        }
        this.logger.log(`connented : ${socket.id} ${socket.nsp.name}`);
    }
    async handleDisconnect(socket) {
        const findUserName = await this.userRepository.findBySocketId(socket.id);
        const Namespace = socket.nsp.name;
        console.log(Namespace);
        const exChatting = await this.chatRepository.findByChatName(Namespace);
        this.logger.log(`disconnented : ${socket.id} ${socket.nsp.name}`);
    }
};
__decorate([
    websockets_1.SubscribeMessage('new_user'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatsGateway.prototype, "handleNewUser", null);
__decorate([
    websockets_1.SubscribeMessage('submit_chat'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatsGateway.prototype, "handleSubmitChat", null);
__decorate([
    __param(0, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatsGateway.prototype, "handleConnection", null);
__decorate([
    __param(0, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatsGateway.prototype, "handleDisconnect", null);
ChatsGateway = __decorate([
    websockets_1.WebSocketGateway({ namespace: 'chatting' }),
    __metadata("design:paramtypes", [chatRepository_1.ChatRepository,
        userRepository_1.UserRepository])
], ChatsGateway);
exports.ChatsGateway = ChatsGateway;
//# sourceMappingURL=chats.gateway.js.map