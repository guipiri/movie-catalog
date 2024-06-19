import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
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

export class UpdateMovieDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  director: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  releaseDate: Date;
}
