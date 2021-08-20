import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserResponseDto {
    @IsNumber()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    chatId: number;
}
