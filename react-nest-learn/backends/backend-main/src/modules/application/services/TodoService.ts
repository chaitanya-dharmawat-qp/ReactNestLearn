import { Injectable } from '@nestjs/common';
import { ITodo } from '../types/ITodo';

@Injectable()
export class TodoService {
  getTodos(): ITodo[] {
    return this.todos ?? [];
  }
  private readonly todos: ITodo[] = [];

  /**Creates a Todo Object and pushes in todos Array which is an In Memory Array of Todos Created In this session */
  createTodo(title: string): ITodo {
    const newTodo: ITodo = {
      id: this.todos.length + 1,
      title,
      status: 'active',
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  getTodoById(id: number): ITodo | undefined {
    return this.todos.find((todo) => todo.id === id);
  }
}
