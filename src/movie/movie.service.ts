import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { Repository } from 'typeorm';
import { MovieDto } from './movie.dto';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<MovieDto[]> {
    return await this.moviesRepository.find();
  }

  async findOne(id: string): Promise<MovieDto> {
    if (!isUUID(id)) {
      throw new BadRequestException('malformed uuid');
    }
    const movie = await this.moviesRepository.findOneBy({ id });
    if (!movie) {
      throw new NotFoundException(`movie with id ${id} not found`);
    }
    return movie;
  }

  async create(movie: MovieDto): Promise<MovieDto> {
    return await this.moviesRepository.save(movie);
  }

  async update(id: number, movie: MovieDto): Promise<void> {
    await this.moviesRepository.update(id, movie);
  }

  async remove(id: string): Promise<void> {
    await this.moviesRepository.delete(id);
  }
}
