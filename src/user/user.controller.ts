import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthDecorators } from 'src/auth/auth.decorator';
import {
  SWAGGER_DES_MALFORMED_REQUEST,
  SWAGGER_DES_USER_CREATED,
  SWAGGER_DES_USER_DELETED,
  SWAGGER_DES_USER_GOTTEN,
  SWAGGER_DES_USER_UPDATED,
} from 'src/constants';
import { UUIDDto, UpdateUserDto, UserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiBadRequestResponse({
  description: SWAGGER_DES_MALFORMED_REQUEST,
})
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* ------ Route to create user ------ */
  @ApiCreatedResponse({
    description: SWAGGER_DES_USER_CREATED,
    type: User,
  })
  @Post()
  async create(@Body() createUserDto: UserDto): Promise<UserDto> {
    return await this.userService.create(createUserDto);
  }
  /* -----------------------------------*/

  /* ------ Route to get all users ------ */
  @AuthDecorators()
  @ApiOkResponse({ description: SWAGGER_DES_USER_GOTTEN, type: [User] })
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }
  /* -------------------------------------*/

  /* ------ Route to get user by username ------ */
  @AuthDecorators()
  @ApiOkResponse({ description: SWAGGER_DES_USER_GOTTEN, type: User })
  @Get(':username')
  async findOne(@Param('username') username: string): Promise<User> {
    return await this.userService.finOne(username);
  }
  /* --------------------------------------------*/

  /* ------ Route to update user ------ */
  @AuthDecorators()
  @ApiResponse({ status: 204, description: SWAGGER_DES_USER_UPDATED })
  @HttpCode(204)
  @Patch(':id')
  async update(
    @Param() { id }: UUIDDto,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    return await this.userService.update(id, updateUserDto);
  }
  /* -----------------------------------*/

  /* ------ Route to delete user ------ */
  @AuthDecorators()
  @ApiResponse({ status: 204, description: SWAGGER_DES_USER_DELETED })
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param() { id }: UUIDDto): Promise<void> {
    return await this.userService.remove(id);
  }
  /* -----------------------------------*/
}
