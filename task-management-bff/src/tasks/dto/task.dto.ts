import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty, IsEnum, } from 'class-validator';

export enum Status {
    OPEN="Open",
    INPROGRESS="In Progress",
    CANCELLED="Canceled",
    DONE="Done"
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
