import { Injectable } from '@nestjs/common';
import { TvDTO } from 'src/tv/dto/tv.dto';
import axios from 'axios'
import { CustomException } from 'src/common/exceptions/custom-exception';

@Injectable()
export class TvService {

    private readonly api_key = process.env.API_KEY
    private readonly tmdb_url = process.env.TMDB_URL

    async getPopular(page: number): Promise<TvDTO[]> {
        const popularList = await this.fetchData('popular',page)
        if(!popularList){
            throw new CustomException('TV popular list not found',404)
        }
        return popularList
    }

    async getTopRated(page:number) : Promise<TvDTO[]> {
        const topratedList = await this.fetchData('top_rated',page)
        if(!topratedList){
            throw new CustomException('Top ratedist list not found',404)
        }
        return topratedList
    }

    async getAiring(page:number) : Promise<TvDTO[]>{
        const airingList = await this.fetchData('airing_today',page)
        if(!airingList){
             throw new CustomException('Airing list not found',404)
        }
        return airingList
    }

    async getOnTheAir(page:number) : Promise<TvDTO[]> {
        const onTheAirList = await this.fetchData('on_the_air',page)
        if(!onTheAirList){
             throw new CustomException('On the air list not found',404)
        }
        return onTheAirList
    }

    private async fetchData(category: string,page: number): Promise<TvDTO[]>{
        const url = this.tmdb_url + '/tv/' + category + '?api_key=' + this.api_key + '&language=en-US' + `&page=${page}`
        const response = await axios.get(url)
        return response.data
    }
}
