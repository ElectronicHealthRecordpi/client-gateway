import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class SetVitalSignsDto {
    @IsNumber()
    @IsOptional()
    @Min(0.5)
    @Max(500)
    weight?: number;

    @IsNumber()
    @IsOptional()
    @Min(20)
    @Max(300)
    height?: number;

    @IsNumber()
    @IsOptional()
    @Min(25)
    @Max(45)
    temperature?: number;

    @IsNumber()
    @IsOptional()
    @Min(40)
    @Max(300)
    systolicBP?: number;

    @IsNumber()
    @IsOptional()
    @Min(20)
    @Max(200)
    diastolicBP?: number;

    @IsNumber()
    @IsOptional()
    @Min(20)
    @Max(300)
    heartRate?: number;

    @IsNumber()
    @IsOptional()
    @Min(4)
    @Max(60)
    respiratoryRate?: number;

    @IsNumber()
    @IsOptional()
    @Min(50)
    @Max(100)
    oxygenSaturation?: number;
}
