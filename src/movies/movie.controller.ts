import { Body, Controller, Post } from '@nestjs/common';
import { MovieService } from './movie.service';


@Controller('movie')
export class MovieController{
  constructor(private movieService: MovieService) {}

  @Post('signup')
  signup()
  {
  
  }
}
