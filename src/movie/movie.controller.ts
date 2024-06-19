import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  SWAGGER_DES_MALFORMED_REQUEST,
  SWAGGER_DES_MOVIE_CREATED,
  SWAGGER_DES_UNAUTHORIZED,
} from 'src/constants';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CreateMovieDto, UpdateMovieDto } from './movie.dto';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';

@ApiBadRequestResponse({
  description: SWAGGER_DES_MALFORMED_REQUEST,
})
@ApiUnauthorizedResponse({ description: SWAGGER_DES_UNAUTHORIZED })
@ApiTags('Movie')
@UseGuards(JwtAuthGuard)
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiCreatedResponse({ description: SWAGGER_DES_MOVIE_CREATED, type: Movie })
  @Post()
  async create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return await this.movieService.create(createMovieDto);
  }

  @Get()
  async findAll(): Promise<Movie[]> {
    return await this.movieService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Movie> {
    return await this.movieService.findOne(id);
  }

  @HttpCode(204)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<void> {
    return await this.movieService.update(id, updateMovieDto);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.movieService.remove(id);
  }
}
