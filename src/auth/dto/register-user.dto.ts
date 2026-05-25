import {
    IsEnum,
    IsNotEmpty,
    IsString,
    Length,
    Matches,
    ValidateIf,
} from 'class-validator';

export enum UserRole {
    PATIENT = 'PATIENT',
    DOCTOR = 'DOCTOR',
    ADMIN = 'ADMIN',
}

export class RegisterUserDto {
    @IsString({ message: 'El nombre de usuario debe ser un texto válido.' })
    @IsNotEmpty({ message: 'El nombre de usuario es obligatorio. Por favor, ingresa un nombre de usuario.' })
    userName!: string;

    @IsString({ message: 'La contraseña debe ser un texto válido.' })
    @IsNotEmpty({ message: 'La contraseña es obligatoria. Por favor, ingresa una contraseña.' })
    @Length(8, 20, {
        message: 'La contraseña debe tener entre 8 y 20 caracteres.',
    })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número.',
    })
    password!: string;

    @ValidateIf(o => o.role !== UserRole.ADMIN)
    @IsNotEmpty({ message: 'El CI es obligatorio para pacientes y médicos.' })
    @IsString({ message: 'El CI debe ser un texto válido.' })
    ci?: string;

    @IsEnum(UserRole, { message: 'El rol debe ser PATIENT, DOCTOR o ADMIN.' })
    role!: UserRole;
}
