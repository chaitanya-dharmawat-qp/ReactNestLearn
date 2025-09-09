import { TodoEntity } from '@modules/todo/domain/entities/TodoEntity';
import { TodoRepository } from '@modules/todo/domain/repositories/TodoRepository';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { TodoDto } from '../dtos/TodoDto';

@Injectable()
export class TodoService {
  constructor(@Inject() private readonly todoRepository: TodoRepository) {}
  async deleteTodoByTitleOrThrowError(title: string): Promise<TodoEntity> {
    if (!title || !(title.length > 1)) {
      throw new HttpException(
        `Title cannot be empty`,
        HttpStatus.PRECONDITION_FAILED,
      );
    }
    const todo = await this.todoRepository.deleteTodoByTitleOrReturnNull(title);
    if (todo) {
      return todo;
    } else {
      throw new HttpException(
        `No Todo Found with Name ${title}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async updateTodoStatusOrThrowError(todoDto: TodoDto): Promise<TodoEntity> {
    const newtodo =
      await this.todoRepository.updateTodoStatusOrReturnNull(todoDto);
    if (newtodo) {
      return newtodo;
    } else {
      throw new HttpException(
        `No Todo Found with Name ${todoDto.title}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getTodosOrThrowError(): Promise<TodoEntity[]> {
    const todos = await this.todoRepository.getAllTodos();
    if (!todos) {
      throw new HttpException('No Todos Found', HttpStatus.NOT_FOUND);
    } else return todos;
  }

  /**Creates todo with unique name or throws error if duplicate name is found */
  async createTodoWithUniqueNameOrThrowError(
    todoI: TodoDto,
  ): Promise<TodoEntity> {
    const todo = await this.todoRepository.createTodoOrReturnNull(todoI);
    if (todo) {
      return todo;
    } else {
      throw new HttpException(
        'Todo with same title already exists:' + todoI.title,
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: 'Todo with same name already exists' },
      );
    }
  }

  async getTodoByIdOrReturnNull(id: number): Promise<TodoEntity | null> {
    return this.todoRepository.getTodoByIdOrReturnNull(id);
  }
}
