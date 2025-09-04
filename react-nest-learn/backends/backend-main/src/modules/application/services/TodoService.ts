import {Injectable} from '@nestjs/common'
import { ITodo } from '../types/ITodo'

@Injectable()
export class TodoService {
  private readonly todos: ITodo[] = []

  createTodo(title: string): ITodo {
    const newTodo: ITodo = {
      id: this.todos.length + 1,
      title,
      status:'active'
    }
    this.todos.push(newTodo)
    return newTodo
  }

  getTodoById(id: number): ITodo | undefined {
    return this.todos.find(todo => todo.id === id)
  }
}
