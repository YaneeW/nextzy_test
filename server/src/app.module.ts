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

@Module({
  imports: [TvModule, HomeModule, MoviesModule, TrendingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
