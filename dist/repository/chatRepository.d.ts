import { PrismaSerivce } from './../prisma/prisma.service';
export declare class ChatRepository {
    private readonly prisma;
    constructor(prisma: PrismaSerivce);
    findById(id: number): Promise<{
        user: import(".prisma/client").User[];
        name: string;
        createdAt: Date;
        updatedAt: Date;
        ChatMessage: import(".prisma/client").ChatMessage[];
    }>;
    findByChatName(name: string): Promise<any>;
    createChat(name: string): Promise<import(".prisma/client").Chat>;
    findByUserName(id: number, name: string): Promise<import(".prisma/client").Chat[]>;
    updateChatUser(id: number, socketId: string, userId: number): Promise<boolean>;
    updateChattingStack(id: number, userId: number, content: string): Promise<import(".prisma/client").Chat>;
    deleteChattingUser(id: number, userId: number): Promise<import(".prisma/client").Chat>;
}
