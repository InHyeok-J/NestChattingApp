import { UserRepository } from './../repository/userRepository';
import { UserRequestDto } from './user.request.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async signup(body: UserRequestDto) {
        const createUser = await this.userRepository.create(body.name);
        return createUser;
    }
}
