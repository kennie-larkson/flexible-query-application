"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWhere = exports.getOrder = void 0;
const typeorm_1 = require("typeorm");
const interface_1 = require("./interface/interface");
const getOrder = (sort) => sort ? { [sort.property]: sort.direction } : {};
exports.getOrder = getOrder;
const getWhere = (filter) => {
    if (!filter)
        return {};
    if (filter.rule == interface_1.FilterRule.IS_NULL)
        return { [filter.property]: (0, typeorm_1.IsNull)() };
    if (filter.rule == interface_1.FilterRule.IS_NOT_NULL)
        return { [filter.property]: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) };
    if (filter.rule == interface_1.FilterRule.EQUALS)
        return { [filter.property]: filter.value };
    if (filter.rule == interface_1.FilterRule.NOT_EQUALS)
        return { [filter.property]: (0, typeorm_1.Not)(filter.value) };
    if (filter.rule == interface_1.FilterRule.GREATER_THAN)
        return { [filter.property]: (0, typeorm_1.MoreThan)(filter.value) };
    if (filter.rule == interface_1.FilterRule.GREATER_THAN_OR_EQUALS)
        return { [filter.property]: (0, typeorm_1.MoreThanOrEqual)(filter.value) };
    if (filter.rule == interface_1.FilterRule.LESS_THAN)
        return { [filter.property]: (0, typeorm_1.LessThan)(filter.value) };
    if (filter.rule == interface_1.FilterRule.LESS_THAN_OR_EQUALS)
        return { [filter.property]: (0, typeorm_1.LessThanOrEqual)(filter.value) };
    if (filter.rule == interface_1.FilterRule.LIKE)
        return { [filter.property]: (0, typeorm_1.ILike)(`%${filter.value}%`) };
    if (filter.rule == interface_1.FilterRule.NOT_LIKE)
        return { [filter.property]: (0, typeorm_1.Not)((0, typeorm_1.ILike)(`%${filter.value}%`)) };
    if (filter.rule == interface_1.FilterRule.IN)
        return { [filter.property]: (0, typeorm_1.In)(filter.value.split(',')) };
    if (filter.rule == interface_1.FilterRule.NOT_IN)
        return { [filter.property]: (0, typeorm_1.Not)((0, typeorm_1.In)(filter.value.split(','))) };
};
exports.getWhere = getWhere;
