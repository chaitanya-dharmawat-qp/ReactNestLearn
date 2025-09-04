"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anotherDatabaseProviders = void 0;
const typeorm_1 = require("typeorm");
exports.anotherDatabaseProviders = [
    {
        provide: 'ANOTHER_DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new typeorm_1.DataSource({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'todoUser',
                password: 'todoPwd',
                database: 'todoDb2',
                entities: [__dirname + '/../../**/*Entity{.ts,.js}'],
            });
            const ds = await dataSource.initialize();
            return ds;
        },
        inject: [],
    },
];
//# sourceMappingURL=AnotherDatabaseProvider.js.map