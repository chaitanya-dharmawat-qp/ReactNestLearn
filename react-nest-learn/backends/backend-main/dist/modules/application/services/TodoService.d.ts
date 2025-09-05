import { ITodo } from '../types/ITodo';
export declare class TodoService {
    getTodos(): ITodo[];
    private readonly todos;
    createTodo(title: string): ITodo;
    getTodoById(id: number): ITodo | undefined;
}
