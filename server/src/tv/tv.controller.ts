import { Controller,Get, Param, Query } from '@nestjs/common';
import { TvService } from './tv.service';
import { TvDTO } from 'src/tv/dto/tv.dto';

@Controller('tv')
export class TvController {

    constructor(private readonly tvService : TvService){}

    @Get('popular')
    getPopular(@Query('page') page:string): Promise<TvDTO[]> {
        const pageNumber = page? Number(page) : 1
        return this.tvService.getPopular(pageNumber)
    }

    @Get('top_rated')
    getTopRated(@Query('page') page:string): Promise<TvDTO[]>{
       const pageNumber = page? Number(page) : 1
        return this.tvService.getTopRated(pageNumber)
    }

    @Get('airing_today')
    getAiring(@Query('page') page:string): Promise<TvDTO[]> {
        const pageNumber = page? Number(page) : 1
        return this.tvService.getAiring(pageNumber)
    }

    @Get('on_the_air')
    getOnTheAir(@Query('page') page:string): Promise<TvDTO[]>{
        const pageNumber = page? Number(page) : 1
        return this.tvService.getOnTheAir(pageNumber)
    }
}
