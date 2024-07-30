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
          host: configService.get('DB_HOST'),
          port: parseInt(configService.get('DB_PORT')),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          url: process.env.DEV_DB_URL,
          entities: [Data],
          synchronize: environment == 'development' ? true : false,
          ssl: true,
        };
      },
    }),
    DataQueryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
