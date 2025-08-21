import { Injectable } from '@nestjs/common';
import { MoviesDTO } from './dto/movies.dto';
import axios from 'axios'


@Injectable()
export class MoviesService {
    private readonly api_key = process.env.API_KEY
    private readonly tmdb_url = process.env.TMDB_URL

    async getPopular(page:number): Promise<MoviesDTO[]>{
        return await this.fetchData('popular',page)
    }

    async getTopRated(page:number): Promise<MoviesDTO[]>{
        return await this.fetchData('top_rated',page)
    }

    async getNowPlaying(page:number): Promise<MoviesDTO[]>{
        return await this.fetchData('now_playing',page)
    }

    async getUpcoming(page:number): Promise<MoviesDTO[]>{
        return await this.fetchData('upcoming',page)
    }
    

    private async fetchData(category: string,page: number): Promise<MoviesDTO[]>{
            const url = this.tmdb_url + '/movie/' + category + '?api_key=' + this.api_key + '&language=en-US' + `&page=${page}`
            const response = await axios.get(url)
            return response.data
    }
}
