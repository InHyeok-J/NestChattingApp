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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRepository = void 0;
const prisma_service_1 = require("./../prisma/prisma.service");
const common_1 = require("@nestjs/common");
const dayjs = require("dayjs");
const dbNow = () => dayjs().add(9, 'hour').toDate();
let ChatRepository = class ChatRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        try {
            return await this.prisma.chat.findUnique({
                where: { id },
                select: {
                    user: true,
                    name: true,
                    createdAt: true,
                    updatedAt: true,
                    ChatMessage: true,
                },
            });
        }
        catch (err) {
            console.error(err);
            throw new common_1.HttpException('db Error', 400);
        }
    }
    async findByChatName(name) {
        try {
            return await this.prisma.chat.findMany({
                where: {
                    name,
                },
            });
        }
        catch (err) {
            console.error(err);
            throw new common_1.HttpException('db Error', 400);
        }
    }
    async createChat(name) {
        try {
            return await this.prisma.chat.create({
                data: {
                    name,
                    createdAt: dbNow(),
                },
            });
        }
        catch (err) {
            console.error(err);
            throw new common_1.HttpException('db Error', 400);
        }
    }
    async findByUserName(id, name) {
        try {
            return await this.prisma.chat.findMany({
                where: {
                    id,
                    user: {
                        some: {
                            name,
                        },
                    },
                },
            });
        }
        catch (err) {
            console.error(err);
            throw new common_1.HttpException('db Error', 400);
        }
    }
    async updateChatUser(id, socketId, userId) {
        try {
            await this.prisma.chat.update({
                where: {
                    id,
                },
                data: {
                    user: {
                        connect: {
                            id: userId,
                        },
                    },
                },
            });
            await this.prisma.user.update({
                where: { id: userId },
                data: {
                    socketId,
                },
            });
            return true;
        }
        catch (err) {
            console.error(err);
            throw new common_1.HttpException('db Error', 400);
        }
    }
    async updateChattingStack(id, userId, content) {
        try {
            return await this.prisma.chat.update({
                where: { id },
                data: {
                    ChatMessage: {
                        create: {
                            userId,
                            content,
                        },
                    },
                },
            });
        }
        catch (err) {
            console.error(err);
            throw new common_1.HttpException('db Error', 400);
        }
    }
    async deleteChattingUser(id, userId) {
        try {
            return await this.prisma.chat.update({
                where: {
                    id,
                },
                data: {
                    user: {
                        disconnect: [{ id: userId }],
                    },
                },
            });
        }
        catch (err) {
            console.error(err);
            throw new common_1.HttpException('db Error', 400);
        }
    }
};
ChatRepository = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaSerivce])
], ChatRepository);
exports.ChatRepository = ChatRepository;
//# sourceMappingURL=chatRepository.js.map