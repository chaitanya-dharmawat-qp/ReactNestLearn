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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let RepositoryService = class RepositoryService {
    constructor(dataSource, anotherDataSource) {
        this.dataSource = dataSource;
        this.anotherDataSource = anotherDataSource;
    }
    getRepository(entity, resultSource) {
        if (resultSource === 'DATA_SOURCE') {
            return this.dataSource.getRepository(entity);
        }
        else {
            return this.anotherDataSource.getRepository(entity);
        }
    }
};
exports.RepositoryService = RepositoryService;
exports.RepositoryService = RepositoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DATA_SOURCE')),
    __param(1, (0, common_1.Inject)('ANOTHER_DATA_SOURCE')),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        typeorm_1.DataSource])
], RepositoryService);
//# sourceMappingURL=RepositoryService.js.map