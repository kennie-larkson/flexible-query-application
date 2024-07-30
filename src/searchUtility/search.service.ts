import { Injectable } from '@nestjs/common';
import { Data } from './search.data.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { sampleData } from './sample-data';
import { getWhere, getOrder } from 'src/helpers';
import {
  Pagination,
  Sorting,
  Filtering,
  PaginatedResource,
} from 'src/interface/interface';

@Injectable()
export class DataQueryService {
  constructor(
    @InjectRepository(Data) private dataRepository: Repository<Data>,
  ) {}

  async createData() {
    await this.dataRepository
      .createQueryBuilder()
      .insert()
      .into(Data)
      .values(sampleData)
      .execute();
  }

  public async getData(
    { page, limit, offset }: Pagination,
    sort?: Sorting,
    filter?: Filtering,
  ): Promise<PaginatedResource<Partial<Data>>> {
    const where = getWhere(filter);
    const order = getOrder(sort);

    const [data, total] = await this.dataRepository.findAndCount({
      where,
      order,
      take: limit,
      skip: offset,
    });

    return {
      totalItems: total,
      items: data,
      page,
    };
  }
}
