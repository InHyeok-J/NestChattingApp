import { PrismaSerivce } from '../prisma/prisma.service';
import { User } from '@prisma/client';
export declare class UserRepository {
    private prisma;
    constructor(prisma: PrismaSerivce);
    create(name: string): Promise<any>;
    findByUsername(name: string): Promise<User[]>;
    findBySocketId(socketId: string): Promise<User[]>;
}
