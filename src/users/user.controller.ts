import { UserService } from './user.service';
import { UserRequestDto } from './user.request.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('signup')
    async signUp(@Body() body: UserRequestDto) {
        return await this.userService.signup(body);
    }
}
