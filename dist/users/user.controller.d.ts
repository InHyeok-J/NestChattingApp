import { UserService } from './user.service';
import { UserRequestDto } from './user.request.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signUp(body: UserRequestDto): Promise<any>;
}
