import { Injectable } from '@nestjs/common';
import { SearchDTO } from './dto/search.dto';
import axios from 'axios'
import { CustomException } from  'src/common/exceptions/custom-exception';

@Injectable()
export class SearchService {

    private readonly api_key = process.env.API_KEY
    private readonly tmdb_url = process.env.TMDB_URL

    async searchAll(query : string){
        const searchList = await this.fetchData('multi',query)
        if(!searchList){
            throw new CustomException('Search as keyword not found',404)
        }
        return searchList
    }

    private async fetchData(category: string,query: string){
        const url = this.tmdb_url + '/search/' + category + '?api_key=' + this.api_key + '&language=en-US&query=' + query + '&page=1&include_adult=false'
        const response = await axios.get(url)
        return response.data
    }

}
