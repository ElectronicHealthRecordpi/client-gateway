import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export enum DiagnosisType {
    PRESUMPTIVE = 'PRESUMPTIVE',
    CONFIRMED = 'CONFIRMED',
    DIFFERENTIAL = 'DIFFERENTIAL',
}

export class AddDiagnosisDto {
    @IsString()
    @IsOptional()
    code?: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    description!: string;

    @IsEnum(DiagnosisType)
    @IsOptional()
    type?: DiagnosisType;

    @IsString()
    @IsOptional()
    notes?: string;
}
