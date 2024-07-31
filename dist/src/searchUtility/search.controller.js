"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataQueryController = void 0;
const common_1 = require("@nestjs/common");
const search_service_1 = require("./search.service");
const utility_class_1 = require("./../utility.class");
const swagger_1 = require("@nestjs/swagger");
const PaginationParams = new utility_class_1.PaginationAndSorting().PaginationParams;
const SortingParams = new utility_class_1.PaginationAndSorting().SortingParams;
const FilteringParams = new utility_class_1.PaginationAndSorting().FilteringParams;
let DataQueryController = class DataQueryController {
    constructor(dataQueryService) {
        this.dataQueryService = dataQueryService;
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dataQueryService.createData();
        });
    }
    getData(paginationParams, sort, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dataQueryService.getData(paginationParams, sort, filter);
        });
    }
};
exports.DataQueryController = DataQueryController;
__decorate([
    (0, common_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DataQueryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiQuery)({ name: 'filters', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: true, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'sort', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    __param(0, PaginationParams(['page', 'limit'])),
    __param(1, SortingParams(['name', 'id', 'userId', 'capacity'])),
    __param(2, FilteringParams(['name', 'id', 'userId', 'capacity'])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], DataQueryController.prototype, "getData", null);
exports.DataQueryController = DataQueryController = __decorate([
    (0, common_1.Controller)('api/rooms'),
    __metadata("design:paramtypes", [search_service_1.DataQueryService])
], DataQueryController);
