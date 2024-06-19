import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  @IsAlphanumeric()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  @IsAlphanumeric()
  username: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UUIDDto {
  @ApiProperty()
  @IsUUID()
  id: string;
}
