import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';
export declare class RepositoryService {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    getRepository<T extends ObjectLiteral>(entity: EntityTarget<T>, resultSource: 'DATA_SOURCE' | 'ANOTHER_DATA_SOURCE'): Repository<T>;
}
