import { PrismaSerivce } from './../prisma/prisma.service';
import { Injectable, HttpException } from '@nestjs/common';
import * as dayjs from 'dayjs';

const dbNow = () => dayjs().add(9, 'hour').toDate();

@Injectable()
export class ChatRepository {
    constructor(private readonly prisma: PrismaSerivce) {}

    async findById(id: number) {
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
        } catch (err) {
            console.error(err);
            throw new HttpException('db Error', 400);
        }
    }

    async findByChatName(name: string): Promise<any> {
        try {
            return await this.prisma.chat.findMany({
                where: {
                    name,
                },
            });
        } catch (err) {
            console.error(err);
            throw new HttpException('db Error', 400);
        }
    }

    async createChat(name: string) {
        try {
            return await this.prisma.chat.create({
                data: {
                    name,
                    createdAt: dbNow(),
                },
            });
        } catch (err) {
            console.error(err);
            throw new HttpException('db Error', 400);
        }
    }

    async findByUserName(id: number, name: string) {
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
        } catch (err) {
            console.error(err);
            throw new HttpException('db Error', 400);
        }
    }

    async updateChatUser(id: number, socketId: string, userId: number) {
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
        } catch (err) {
            console.error(err);
            throw new HttpException('db Error', 400);
        }
    }

    async updateChattingStack(id: number, userId: number, content: string) {
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
        } catch (err) {
            console.error(err);
            throw new HttpException('db Error', 400);
        }
    }

    async deleteChattingUser(id: number, userId: number) {
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
        } catch (err) {
            console.error(err);
            throw new HttpException('db Error', 400);
        }
    }
}
