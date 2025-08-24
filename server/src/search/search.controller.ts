import { Controller, Query ,Get} from '@nestjs/common';
import { SearchDTO } from './dto/search.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {

    constructor(private readonly searchService : SearchService){}

    @Get('all')
    searchAll(@Query('keyword') keyword:string) : Promise<SearchDTO[]>{
        return  this.searchService.searchAll(keyword)
    }
    
}
