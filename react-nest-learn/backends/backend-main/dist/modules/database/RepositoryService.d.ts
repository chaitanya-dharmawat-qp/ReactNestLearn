import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';
export declare class RepositoryService {
    private readonly dataSource;
    private readonly anotherDataSource;
    constructor(dataSource: DataSource, anotherDataSource: DataSource);
    getRepository<T extends ObjectLiteral>(entity: EntityTarget<T>, resultSource: 'DATA_SOURCE' | 'ERROR_LOG_DB_PROVIDER'): Repository<T>;
}
