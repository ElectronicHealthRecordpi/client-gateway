import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString({ message: 'El nombre de usuario debe ser un texto válido.' })
    @Length(3, 30, { message: 'El nombre de usuario debe tener entre 3 y 30 caracteres.' })
    userName?: string;
}
