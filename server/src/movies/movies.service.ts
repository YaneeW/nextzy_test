import { Injectable } from '@nestjs/common';
import { MoviesDTO } from './dto/movies.dto';
import axios from 'axios'
import { CustomException } from 'src/common/exceptions/custom-exception';


@Injectable()
export class MoviesService {
    private readonly api_key = process.env.API_KEY
    private readonly tmdb_url = process.env.TMDB_URL

    async getPopular(page:number): Promise<MoviesDTO[]>{
        const populatList = await this.fetchData('popular',page)
        if(!populatList){
            throw new CustomException('Popular list not found',404)
        }
        return populatList
    }

    async getTopRated(page:number): Promise<MoviesDTO[]>{
        const topratedList = await this.fetchData('top_rated',page)
        if(!topratedList){
             throw new CustomException('Top rated list not found',404)
        }
        return topratedList
    }

    async getNowPlaying(page:number): Promise<MoviesDTO[]>{
        const nowPlayingList =  await this.fetchData('now_playing',page)
        if(!nowPlayingList){
             throw new CustomException('Now playing list not found',404)
        }
        return nowPlayingList
    }

    async getUpcoming(page:number): Promise<MoviesDTO[]>{
        const upcomingList = await this.fetchData('upcoming',page)
        if(!upcomingList){
              throw new CustomException('Upcoming list not found',404)
        }
        return upcomingList
    }
    

    private async fetchData(category: string,page: number): Promise<MoviesDTO[]>{
            const url = this.tmdb_url + '/movie/' + category + '?api_key=' + this.api_key + '&language=en-US' + `&page=${page}`
            const response = await axios.get(url)
            return response.data
    }
}
