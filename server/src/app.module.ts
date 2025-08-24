import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TvModule } from './tv/tv.module';
import { HomeController } from './home/home.controller';
import { HomeModule } from './home/home.module';
import { MoviesController } from './movies/movies.controller';
import { MoviesModule } from './movies/movies.module';
import { TrendingController } from './trending/trending.controller';
import { TrendingModule } from './trending/trending.module';
import { SearchController } from './search/search.controller';
import { SearchService } from './search/search.service';
import { SearchModule } from './search/search.module';

@Module({
  imports: [TvModule, HomeModule, MoviesModule, TrendingModule, SearchModule],
  controllers: [AppController],
  providers: [AppService, SearchService],
})
export class AppModule {}
