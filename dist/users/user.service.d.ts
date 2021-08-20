import { UserRepository } from './../repository/userRepository';
import { UserRequestDto } from './user.request.dto';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    signup(body: UserRequestDto): Promise<any>;
}
