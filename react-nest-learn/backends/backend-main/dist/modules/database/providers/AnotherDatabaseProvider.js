"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anotherDatabaseProviders = void 0;
const ErrorLogEntity_1 = require("../../../ExceptionFilter/entities/ErrorLogEntity");
const typeorm_1 = require("typeorm");
const DatabaseConstants_1 = require("../constants/DatabaseConstants");
exports.anotherDatabaseProviders = [
    {
        provide: DatabaseConstants_1.ANOTHER_DATA_SOURCE,
        useFactory: async () => {
            const dataSource = new typeorm_1.DataSource({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'todoUser',
                password: 'todoPwd',
                database: 'errorLogDb',
                entities: [ErrorLogEntity_1.ErrorLogEntity],
                synchronize: true,
            });
            const ds = await dataSource.initialize();
            return ds;
        },
        inject: [],
    },
];
//# sourceMappingURL=AnotherDatabaseProvider.js.map