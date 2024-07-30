import { Module } from '@nestjs/common';
import { DataQueryController } from './search.controller';
import { DataQueryService } from './search.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Data } from './search.data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Data])],
  controllers: [DataQueryController],
  providers: [DataQueryService],
  exports: [TypeOrmModule],
})
export class DataQueryModule {}
