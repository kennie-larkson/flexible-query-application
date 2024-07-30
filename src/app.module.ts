import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataQueryModule } from './searchUtility/search.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Data } from './searchUtility/search.data.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const environment = process.env.NODE_ENV;
        return {
          type: 'postgres',
          url: process.env.DEV_DB_URL,
          entities: [Data],
          synchronize: environment == 'development' ? true : false,
        };
      },
    }),
    DataQueryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
