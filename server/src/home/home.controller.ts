import { Controller,Get, Query  } from '@nestjs/common';
import { MoviesService } from 'src/movies/movies.service';
import { TvService } from 'src/tv/tv.service';
import { TrendingService } from 'src/trending/trending.service';
import { HomesDTO } from './dto/home.dto';

@Controller('home')
export class HomeController {

    constructor(
        private readonly moviesService : MoviesService,
        private readonly tvService : TvService,
        private readonly trendingService : TrendingService 
    ){}

    @Get('movies_popular')
    getMoviesPopular(@Query('page') page:string): Promise<HomesDTO[]>{
        const pageNumber = page? Number(page) : 1
        return this.moviesService.getPopular(pageNumber)
    }

    @Get('tv_popular')
    getTvPopular(@Query('page') page:string): Promise<HomesDTO[]>{
         const pageNumber = page? Number(page) : 1
        return this.tvService.getPopular(pageNumber)
    }

    @Get('movies_trending')
    getMoviesTrending(): Promise<HomesDTO[]>{
        return this.trendingService.getMovies()
    }
       
    @Get('tv_trending')
    getTvTrending(): Promise<HomesDTO[]>{
        return this.trendingService.getTv()
    }
}
