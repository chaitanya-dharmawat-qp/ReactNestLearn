"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadAppConfig = void 0;
const loadAppConfig = () => {
    const config = {
        app: {
            port: parseInt(process.env.PORT),
        },
        database: {
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            databaseName: process.env.DB_NAME,
        },
    };
    return config;
};
exports.loadAppConfig = loadAppConfig;
//# sourceMappingURL=loadAppConfig.js.map