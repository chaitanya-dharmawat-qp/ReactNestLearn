"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const typeorm_1 = require("typeorm");
const DatabaseConstants_1 = require("../constants/DatabaseConstants");
const config_1 = require("@nestjs/config");
exports.databaseProviders = [
    {
        provide: DatabaseConstants_1.DATA_SOURCE,
        useFactory: async (configService) => {
            const databaseConfig = configService.get('database');
            if (!databaseConfig) {
                throw new Error('Database configuration is not defined');
            }
            const dataSource = new typeorm_1.DataSource({
                type: 'mysql',
                host: databaseConfig.host,
                port: databaseConfig.port,
                username: databaseConfig.username,
                password: databaseConfig.password,
                database: databaseConfig.databaseName,
                entities: [__dirname + '/../../**/*Entity{.ts,.js}'],
            });
            const db = await dataSource.initialize();
            return db;
        },
        inject: [config_1.ConfigService],
    },
];
//# sourceMappingURL=DatabaseProvider.js.map