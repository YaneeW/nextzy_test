import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { MoviesModule } from 'src/movies/movies.module';
import { TvModule } from 'src/tv/tv.module';
import { TrendingModule } from 'src/trending/trending.module';

@Module({
  imports: [MoviesModule,TvModule,TrendingModule],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
