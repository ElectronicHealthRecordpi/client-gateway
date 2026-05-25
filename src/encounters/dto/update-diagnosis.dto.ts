import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { DiagnosisType } from './add-diagnosis.dto';

export class UpdateDiagnosisDto {
    @IsString()
    @IsOptional()
    code?: string;

    @IsString()
    @IsOptional()
    @MinLength(3)
    description?: string;

    @IsEnum(DiagnosisType)
    @IsOptional()
    type?: DiagnosisType;

    @IsString()
    @IsOptional()
    notes?: string;
}
