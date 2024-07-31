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
exports.DataQueryService = void 0;
const common_1 = require("@nestjs/common");
const search_data_entity_1 = require("./search.data.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const sample_data_1 = require("./sample-data");
const helpers_1 = require("./../helpers");
let DataQueryService = class DataQueryService {
    constructor(dataRepository) {
        this.dataRepository = dataRepository;
    }
    createData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dataRepository
                .createQueryBuilder()
                .insert()
                .into(search_data_entity_1.Data)
                .values(sample_data_1.sampleData)
                .execute();
        });
    }
    getData(_a, sort_1, filter_1) {
        return __awaiter(this, arguments, void 0, function* ({ page, limit, offset }, sort, filter) {
            const where = (0, helpers_1.getWhere)(filter);
            const order = (0, helpers_1.getOrder)(sort);
            const [data, total] = yield this.dataRepository.findAndCount({
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
        });
    }
};
exports.DataQueryService = DataQueryService;
exports.DataQueryService = DataQueryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(search_data_entity_1.Data)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], DataQueryService);
