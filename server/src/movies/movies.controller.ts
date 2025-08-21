import { Controller,Get,Query } from '@nestjs/common';
import { MoviesDTO } from './dto/movies.dto'
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService : MoviesService){}

    @Get('popular')
    getPopular(@Query('page') page:string): Promise<MoviesDTO[]>{
        const pageNumber = page? Number(page) : 1
        return this.moviesService.getPopular(pageNumber)
    }

    @Get('top_rated')
    getTopRated(@Query('page') page:string): Promise<MoviesDTO[]>{
        const pageNumber = page? Number(page) : 1
        return this.moviesService.getTopRated(pageNumber)
    }

    @Get('upcoming')
    getUpcoming(@Query('page') page:string): Promise<MoviesDTO[]>{
        const pageNumber = page? Number(page) : 1
        return this.moviesService.getUpcoming(pageNumber)
    }

    @Get('now_playing')
    getNowPlaying(@Query('page') page:string): Promise<MoviesDTO[]>{
        const pageNumber = page? Number(page) : 1
        return this.moviesService.getNowPlaying(pageNumber)
    }

}
