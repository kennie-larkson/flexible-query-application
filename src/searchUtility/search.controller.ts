import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { DataQueryService } from './search.service';
import {
  Filtering,
  PaginatedResource,
  Pagination,
  Sorting,
} from './../interface/interface';
import { Data } from './search.data.entity';
import { PaginationAndSorting } from './../utility.class';
import { ApiQuery } from '@nestjs/swagger';

const PaginationParams = new PaginationAndSorting().PaginationParams;
const SortingParams = new PaginationAndSorting().SortingParams;
const FilteringParams = new PaginationAndSorting().FilteringParams;

@Controller('api/rooms')
export class DataQueryController {
  constructor(private dataQueryService: DataQueryService) {}

  @Post()
  async create() {
    await this.dataQueryService.createData();
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'filters', required: false, type: String })
  @ApiQuery({ name: 'limit', required: true, type: Number })
  @ApiQuery({ name: 'sort', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number })
  public async getData(
    @PaginationParams(['page', 'limit']) paginationParams: Pagination,
    @SortingParams(['name', 'id', 'userId', 'capacity']) sort?: Sorting,
    @FilteringParams(['name', 'id', 'userId', 'capacity']) filter?: Filtering,
  ): Promise<PaginatedResource<Partial<Data>>> {
    return await this.dataQueryService.getData(paginationParams, sort, filter);
  }
}
