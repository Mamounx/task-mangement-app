import { IsOptional, IsString, IsNotEmpty, IsEnum, } from 'class-validator';
import { Status } from './task.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty()
    @IsString()
    @IsEnum(Status)
    @IsOptional()
    status: Status;
}
