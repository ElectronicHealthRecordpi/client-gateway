import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @IsString({ message: 'El nombre de usuario debe ser un texto válido.' })
    @IsNotEmpty({
        message: 'El nombre de usuario es obligatorio. Por favor, ingresa tu nombre de usuario.',
    })
    userName: string;

    @IsString({ message: 'La contraseña debe ser un texto válido.' })
    @IsNotEmpty({
        message: 'La contraseña es obligatoria. Por favor, ingresa tu contraseña.',
    })
    @MinLength(6, {
        message: 'La contraseña debe tener al menos 6 caracteres.',
    })
    password: string;
}
