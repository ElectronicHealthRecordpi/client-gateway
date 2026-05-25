import { IsArray, IsDateString, IsIn, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class EpidemiologyDateRangeDto {
    @IsOptional()
    @IsDateString()
    startDate?: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;
}

export class EpidemiologyHeatmapDto extends EpidemiologyDateRangeDto {
    @IsOptional()
    @IsString()
    diseaseKey?: string;
}

export class EpidemiologyIncidenceDto extends EpidemiologyDateRangeDto {
    @IsOptional()
    @IsIn(['day', 'week', 'month'])
    granularity?: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    topN?: number;
}

export class EpidemiologyTrendsDto extends EpidemiologyDateRangeDto {
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    diseaseKeys?: string[];

    @IsOptional()
    @IsIn(['day', 'week', 'month'])
    granularity?: string;
}

export class EpidemiologyClustersDto extends EpidemiologyDateRangeDto {
    @IsString()
    diseaseKey!: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    epsKm?: number;

    @IsOptional()
    @IsNumber()
    @Min(2)
    @Type(() => Number)
    minSamples?: number;
}

export class EpidemiologyOutbreakDto {
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    diseaseKeys?: string[];

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    baselineWeeks?: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    zThreshold?: number;
}
