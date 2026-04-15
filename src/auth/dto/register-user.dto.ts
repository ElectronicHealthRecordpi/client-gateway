import {
    IsNotEmpty,
    IsString,
    IsUUID,
    Length,
    Matches,
} from 'class-validator';

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

    @IsNotEmpty({ message: 'El ID del paciente es obligatorio.' })
    @IsString({ message: 'El ID del paciente debe ser un texto válido.' })
    // @IsUUID('4', {
    //     message: 'El ID del paciente no tiene un formato UUID válido. Asegúrate de enviar un identificador correcto.',
    // })
    ci!: string;
}
