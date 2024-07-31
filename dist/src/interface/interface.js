"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterRule = void 0;
var FilterRule;
(function (FilterRule) {
    FilterRule["EQUALS"] = "eq";
    FilterRule["NOT_EQUALS"] = "neq";
    FilterRule["GREATER_THAN"] = "gt";
    FilterRule["GREATER_THAN_OR_EQUALS"] = "gte";
    FilterRule["LESS_THAN"] = "lt";
    FilterRule["LESS_THAN_OR_EQUALS"] = "lte";
    FilterRule["LIKE"] = "like";
    FilterRule["NOT_LIKE"] = "nlike";
    FilterRule["IN"] = "in";
    FilterRule["NOT_IN"] = "nin";
    FilterRule["IS_NULL"] = "isnull";
    FilterRule["IS_NOT_NULL"] = "isnotnull";
})(FilterRule || (exports.FilterRule = FilterRule = {}));
