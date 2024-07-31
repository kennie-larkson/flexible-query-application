"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationAndSorting = void 0;
const common_1 = require("@nestjs/common");
const interface_1 = require("./interface/interface");
class PaginationAndSorting {
    constructor() {
        this.PaginationParams = (0, common_1.createParamDecorator)((data, context) => {
            const req = context.switchToHttp().getRequest();
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            if (isNaN(page) || page < 0 || isNaN(limit) || limit < 0) {
                throw new common_1.BadRequestException('Invalid pagination params');
            }
            if (limit > 5) {
                throw new common_1.BadRequestException('Invalid pagination params: Max size is 5');
            }
            // calculate pagination parameters
            const offset = page * limit;
            return { page, limit, offset };
        });
        this.SortingParams = (0, common_1.createParamDecorator)((validParams, ctx) => {
            const req = ctx.switchToHttp().getRequest();
            const sort = req.query.sort;
            if (!sort)
                return null;
            // check if the valid params sent is an array
            if (typeof validParams != 'object')
                throw new common_1.BadRequestException('Invalid sort parameter');
            // check the format of the sort query param
            const sortPattern = /^([a-zA-Z0-9]+):(asc|desc)$/;
            if (!sort.match(sortPattern))
                throw new common_1.BadRequestException('Invalid sort parameter');
            // extract the property name and direction and check if they are valid
            const [property, direction] = sort.split(':');
            if (!validParams.includes(property))
                throw new common_1.BadRequestException(`Invalid sort property: ${property}`);
            return { property, direction };
        });
        this.FilteringParams = (0, common_1.createParamDecorator)((data, ctx) => {
            const req = ctx.switchToHttp().getRequest();
            const filter = req.query.filters;
            if (!filter)
                return null;
            // check if the valid params sent is an array
            if (typeof data != 'object')
                throw new common_1.BadRequestException('Invalid filter parameter');
            // validate the format of the filter, if the rule is 'isnull' or 'isnotnull' it don't need to have a value
            if (!filter.match(/^[a-zA-Z0-9_]+:(eq|neq|gt|gte|lt|lte|like|nlike|in|nin):[a-zA-Z0-9_,]+$/) &&
                !filter.match(/^[a-zA-Z0-9_]+:(isnull|isnotnull)$/)) {
                throw new common_1.BadRequestException('Invalid filter parameter');
            }
            // extract the parameters and validate if the rule and the property are valid
            const [property, rule, value] = filter.split(':');
            if (!data.includes(property))
                throw new common_1.BadRequestException(`Invalid filter property: ${property}`);
            if (!Object.values(interface_1.FilterRule).includes(rule))
                throw new common_1.BadRequestException(`Invalid filter rule: ${rule}`);
            return { property, rule, value };
        });
    }
}
exports.PaginationAndSorting = PaginationAndSorting;
