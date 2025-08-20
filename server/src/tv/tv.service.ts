import { Injectable } from '@nestjs/common';
import { TvDTO } from 'src/tv/dto/tv.dto';
import axios from 'axios'

@Injectable()
export class TvService {

    private readonly api_key = process.env.API_KEY
    private readonly tmdb_url = process.env.TMDB_URL
    private popularTv = []

    async getPopular(page: number): Promise<TvDTO[]> {
        return await this.fetchData('popular',page)
    }

    private async fetchData(category: string,page: number): Promise<TvDTO[]>{
        const url = this.tmdb_url + '/tv/' + category + '?api_key=' + this.api_key + '&language=en-US' + `&page=${page}`
        const response = await axios.get(url)
        return response.data
    }
}
