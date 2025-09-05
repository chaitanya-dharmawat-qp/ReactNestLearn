"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadAppConfig = void 0;
const common_1 = require("@nestjs/common");
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
    common_1.Logger.warn({ loadingAppConfig: config });
    return config;
};
exports.loadAppConfig = loadAppConfig;
//# sourceMappingURL=loadAppConfig.js.map