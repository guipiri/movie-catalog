import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MOVIE_NOT_FOUND } from 'src/constants';
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
    const movie = await this.moviesRepository.findOneBy({ id });
    if (!movie) {
      throw new NotFoundException(`${MOVIE_NOT_FOUND} ${id}`);
    }
    return movie;
  }

  async create(movie: CreateMovieDto): Promise<Movie> {
    return await this.moviesRepository.save(movie);
  }

  async update(id: string, movie: UpdateMovieDto): Promise<void> {
    const { affected } = await this.moviesRepository.update(id, movie);
    if (!affected) {
      throw new NotFoundException(`${MOVIE_NOT_FOUND} ${id}`);
    }
  }

  async remove(id: string): Promise<void> {
    const { affected } = await this.moviesRepository.delete(id);
    if (!affected) {
      throw new NotFoundException(`${MOVIE_NOT_FOUND} ${id}`);
    }
  }
}
