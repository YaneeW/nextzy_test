import { Injectable } from '@nestjs/common';
import { TrendingDTO } from './dto/trending.dto';
import axios from 'axios'
import { CustomException } from 'src/common/exceptions/custom-exception';

@Injectable()
export class TrendingService {

    private readonly api_key = process.env.API_KEY
    private readonly tmdb_url = process.env.TMDB_URL

    async getAll(){
        const trendingList = await this.fetchData('all')
        if(!trendingList){
            throw new CustomException('Trending list not found',404)
        }
        return trendingList
    }

    async getMovies(){
        const moviesList = await this.fetchData('movie')
        if(!moviesList){
            throw new CustomException('Trending movies list not found',404)
        }
        return moviesList
    }

    async getPeople(){
        const response = await this.fetchData('person')
        if(!response){
            throw new CustomException('Trending people list not found',404)
        }
        const newResponse = response.results.map((item: any)=>{
            item['backdrop_path'] = item.profile_path || null
            item['poster_path'] = item.profile_path  || null
            item['title'] = item.name
            item['overview'] = item.known_for_department
             return item
            }
        )
        return {...response,results:newResponse}
    }

    async getTv(){
        const tvList =  await this.fetchData('tv')
        if(!tvList){
            throw new CustomException('Trending tv list not found',404)
        }
        return tvList
    }

    private async fetchData(category: string){
        const url = this.tmdb_url + '/trending/' + category + '/day?api_key=' + this.api_key + '&language=en-US'
        const response = await axios.get(url)
        return response.data
    }
}
