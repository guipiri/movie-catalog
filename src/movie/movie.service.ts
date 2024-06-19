import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateMovieDto, UpdateMovieDto } from './movie.dto';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return await this.moviesRepository.find();
  }

  async findOne(id: string): Promise<Movie> {
    if (!isUUID(id)) {
      throw new BadRequestException('Malformed uuid');
    }
    const movie = await this.moviesRepository.findOneBy({ id });
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    return movie;
  }

  async create(movie: CreateMovieDto): Promise<Movie> {
    return await this.moviesRepository.save(movie);
  }

  async update(id: string, movie: UpdateMovieDto): Promise<void> {
    if (!isUUID(id)) {
      throw new BadRequestException('Malformed uuid');
    }

    const { affected } = await this.moviesRepository.update(id, movie);
    if (!affected) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
  }

  async remove(id: string): Promise<any> {
    if (!isUUID(id)) {
      throw new BadRequestException('Malformed uuid');
    }

    const { affected } = await this.moviesRepository.delete(id);
    if (!affected) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
  }
}
