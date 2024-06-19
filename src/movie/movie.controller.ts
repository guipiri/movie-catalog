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
  SWAGGER_DES_BAD_REQUEST,
  SWAGGER_DES_MOVIE_CREATED,
  SWAGGER_DES_MOVIE_DELETED,
  SWAGGER_DES_MOVIE_GOTTEN,
  SWAGGER_DES_MOVIE_UPDATED,
} from 'src/constants';
import { UUIDDto } from 'src/user/user.dto';
import { CreateMovieDto, UpdateMovieDto } from './movie.dto';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';

@ApiBadRequestResponse({
  description: SWAGGER_DES_BAD_REQUEST,
})
@AuthDecorators()
@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  /* ------ Route to create movie ------ */
  @ApiCreatedResponse({ description: SWAGGER_DES_MOVIE_CREATED, type: Movie })
  @Post()
  async create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return await this.movieService.create(createMovieDto);
  }
  /* ------------------------------------*/

  /* ------ Route to get all movies ------ */
  @ApiOkResponse({ description: SWAGGER_DES_MOVIE_GOTTEN, type: [Movie] })
  @Get()
  async findAll(): Promise<Movie[]> {
    return await this.movieService.findAll();
  }
  /* --------------------------------------*/

  /* ------ Route to get user by id ------ */
  @ApiOkResponse({ description: SWAGGER_DES_MOVIE_GOTTEN, type: Movie })
  @Get(':id')
  async findOne(@Param() { id }: UUIDDto): Promise<Movie> {
    return await this.movieService.findOne(id);
  }
  /* --------------------------------------*/

  /* ------ Route to update movie ------ */
  @ApiResponse({ status: 204, description: SWAGGER_DES_MOVIE_UPDATED })
  @HttpCode(204)
  @Patch(':id')
  async update(
    @Param() { id }: UUIDDto,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<void> {
    return await this.movieService.update(id, updateMovieDto);
  }
  /* -----------------------------------*/

  /* ------ Route to delete movie ------ */
  @ApiResponse({ status: 204, description: SWAGGER_DES_MOVIE_DELETED })
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param() { id }: UUIDDto): Promise<void> {
    return await this.movieService.remove(id);
  }
  /* ------------------------------------*/
}
