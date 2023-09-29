import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty, IsEnum, } from 'class-validator';

export enum Status {
    OPEN="open",
    INPROGRESS="inprogress",
    CANCELLED="cancelled",
    DONE="done"
};

export class TaskDto {
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
    @IsNotEmpty()
    status: Status;

    @ApiProperty()
    createdAt: number;
    
    @ApiProperty()
    updatedAt: number;
}
