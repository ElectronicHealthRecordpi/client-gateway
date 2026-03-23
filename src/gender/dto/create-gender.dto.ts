import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { GenderEnum } from "../enum/gender.enum";

export class CreateGenderDto {

    @IsString({
        message: 'El campo nombre debe ser una cadena de texto'
    })
    @IsEnum(GenderEnum, {
        message: `los valores permitidos para el campo nombre son: ${Object.values(GenderEnum).join(', ')}`
    })
    @IsNotEmpty(
        {
            message: 'El campo nombre no puede estar vacío'
        }
    )
    name: GenderEnum
}
