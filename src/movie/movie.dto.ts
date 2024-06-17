import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class MovieDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  director: string;

  @ApiProperty()
  @IsDateString()
  releaseDate: Date;
}
