import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';
import {
  Pagination,
  Sorting,
  FilterRule,
  Filtering,
} from './interface/interface';

export class PaginationAndSorting {
  PaginationParams = createParamDecorator(
    (data, context: ExecutionContext): Pagination => {
      const req: Request = context.switchToHttp().getRequest();
      const page = parseInt(req.query.page as string);
      const limit = parseInt(req.query.limit as string);

      if (isNaN(page) || page < 0 || isNaN(limit) || limit < 0) {
        throw new BadRequestException('Invalid pagination params');
      }

      if (limit > 5) {
        throw new BadRequestException(
          'Invalid pagination params: Max size is 5',
        );
      }

      // calculate pagination parameters

      const offset = page * limit;
      return { page, limit, offset };
    },
  );

  SortingParams = createParamDecorator(
    (validParams, ctx: ExecutionContext): Sorting => {
      const req: Request = ctx.switchToHttp().getRequest();
      const sort = req.query.sort as string;
      if (!sort) return null;

      // check if the valid params sent is an array
      if (typeof validParams != 'object')
        throw new BadRequestException('Invalid sort parameter');

      // check the format of the sort query param
      const sortPattern = /^([a-zA-Z0-9]+):(asc|desc)$/;
      if (!sort.match(sortPattern))
        throw new BadRequestException('Invalid sort parameter');

      // extract the property name and direction and check if they are valid
      const [property, direction] = sort.split(':');
      if (!validParams.includes(property))
        throw new BadRequestException(`Invalid sort property: ${property}`);

      return { property, direction };
    },
  );

  FilteringParams = createParamDecorator(
    (data, ctx: ExecutionContext): Filtering => {
      const req: Request = ctx.switchToHttp().getRequest();
      const filter = req.query.filters as string;
      if (!filter) return null;

      // check if the valid params sent is an array
      if (typeof data != 'object')
        throw new BadRequestException('Invalid filter parameter');

      // validate the format of the filter, if the rule is 'isnull' or 'isnotnull' it don't need to have a value
      if (
        !filter.match(
          /^[a-zA-Z0-9_]+:(eq|neq|gt|gte|lt|lte|like|nlike|in|nin):[a-zA-Z0-9_,]+$/,
        ) &&
        !filter.match(/^[a-zA-Z0-9_]+:(isnull|isnotnull)$/)
      ) {
        throw new BadRequestException('Invalid filter parameter');
      }

      // extract the parameters and validate if the rule and the property are valid
      const [property, rule, value] = filter.split(':');
      if (!data.includes(property))
        throw new BadRequestException(`Invalid filter property: ${property}`);
      if (!Object.values(FilterRule).includes(rule as FilterRule))
        throw new BadRequestException(`Invalid filter rule: ${rule}`);

      return { property, rule, value };
    },
  );
}
