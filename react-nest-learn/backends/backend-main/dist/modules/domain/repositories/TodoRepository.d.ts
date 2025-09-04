import { DataSource, Repository } from 'typeorm';
import { TodoEntity } from '../entities/TodoEntity';
export declare const todoRepositoryProvider: {
    provide: string;
    useFactory: (dataSource: DataSource) => Repository<TodoEntity>;
    inject: string[];
}[];
export declare class TodoRepository {
    private todoRepository;
    constructor(todoRepository: Repository<TodoEntity>);
    createTodo(todoEntity: TodoEntity): Promise<TodoEntity>;
    getTodoById(id: number): Promise<TodoEntity | null>;
}
