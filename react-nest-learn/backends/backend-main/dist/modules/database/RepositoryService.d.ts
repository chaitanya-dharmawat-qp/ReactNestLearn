import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';
export declare class RepositoryService {
    private readonly dataSource;
    private readonly anotherDataSource;
    constructor(dataSource: DataSource, anotherDataSource: DataSource);
    getRepository<T extends ObjectLiteral>(entity: EntityTarget<T>, resultSource: 'DATA_SOURCE' | 'ANOTHER_DATA_SOURCE'): Repository<T>;
}
