import { Controller,Get,Query } from '@nestjs/common';
import { TrendingService } from './trending.service';
import { TrendingDTO } from './dto/trending.dto';

@Controller('trending')
export class TrendingController {

    constructor(private readonly trendingService : TrendingService){}

    @Get('all')
    getAll(): Promise<TrendingDTO[]>{
        return this.trendingService.getAll()
    }

    @Get('movies')
    getMovies(): Promise<TrendingDTO[]>{
        return this.trendingService.getMovies()
    }

    @Get('people')
    getPeople(): Promise<TrendingDTO[]>{
        return this.trendingService.getPeople()
    }

    @Get('tv')
    getTv(): Promise<TrendingDTO[]>{
        return this.trendingService.getTv()
    }
}
