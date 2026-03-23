import { IsEnum, IsNotEmpty } from 'class-validator';
import { BloodTypeEnum } from '../enum/blood-type.enum';

export class CreateBloodTypeDto {
    @IsEnum(BloodTypeEnum, {
        message: `Los valores permitidos para el tipo de sangre son: ${Object.values(BloodTypeEnum).join(', ')}`,
    })
    @IsNotEmpty({ message: 'El campo tipo de sangre no puede estar vacío' })
    name: BloodTypeEnum;
}
