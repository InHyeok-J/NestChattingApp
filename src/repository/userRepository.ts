import { UserResponseDto } from './../users/user.response.dto';
import { UserRequestDto } from './../users/user.request.dto';
import { Injectable, HttpException } from '@nestjs/common';
import { PrismaSerivce } from '../prisma/prisma.service';
import * as dayjs from 'dayjs';
import { User, Prisma } from '@prisma/client';

const dbNow = () => dayjs().add(9, 'hour').toDate();

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaSerivce) {}

    async create(name: string): Promise<any> {
        try {
            return await this.prisma.user.create({
                data: {
                    name,
                    createdAt: dbNow(),
                },
                select: {
                    id: true,
                    name: true,
                    chatId: true,
                },
            });
        } catch (err) {
            console.error(err);
            throw new HttpException('db Error', 400);
        }
    }

    async findByUsername(name: string) {
        try {
            return await this.prisma.user.findMany({
                where: {
                    name,
                },
            });
        } catch (err) {
            console.error(err);
            throw new HttpException('db Error', 400);
        }
    }

    async findBySocketId(socketId: string) {
        try {
            return await this.prisma.user.findMany({
                where: {
                    socketId,
                },
            });
        } catch (err) {
            console.error(err);
            throw new HttpException('db Error', 400);
        }
    }
}
