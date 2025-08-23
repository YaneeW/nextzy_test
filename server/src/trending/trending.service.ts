import { Injectable } from '@nestjs/common';
import { TrendingDTO } from './dto/trending.dto';
import axios from 'axios'

@Injectable()
export class TrendingService {

    private readonly api_key = process.env.API_KEY
    private readonly tmdb_url = process.env.TMDB_URL

    async getAll(){
        return await this.fetchData('all')
    }

    async getMovies(){
        return await this.fetchData('movie')
    }

    async getPeople(){
        const response = await this.fetchData('person')
        const newResponse = response.results.map((item: any)=>{
            console.log("item",item)
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
        return await this.fetchData('tv')
    }

    private async fetchData(category: string){
        const url = this.tmdb_url + '/trending/' + category + '/day?api_key=' + this.api_key + '&language=en-US'
        const response = await axios.get(url)
        return response.data
    }
}
