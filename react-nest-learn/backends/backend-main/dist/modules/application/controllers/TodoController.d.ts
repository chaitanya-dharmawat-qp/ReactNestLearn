import { TodoService } from '../services/TodoService';
import { ITodo } from '../types/ITodo';
import { TodoDto } from '../dtos/TodoDto';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    getAllTodosOrDeleteSystem32(): ITodo[];
    getTodo(id: number): ITodo;
    createTodo(todoDto: TodoDto): ITodo;
}
