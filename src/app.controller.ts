import { Get, Controller, Render, Post } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    @Render('index')
    root() {
        return {
            data: {
                title: 'Chatting',
                copyright: 'inhyeok',
            },
        };
    }

    @Get('login')
    @Render('login')
    login() {
        return { message: 'good' };
    }

    @Get('chat')
    @Render('chatting')
    chattingPage() {
        return {
            data: {
                good: 'good',
            },
        };
    }
}
