import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserRequestDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}
