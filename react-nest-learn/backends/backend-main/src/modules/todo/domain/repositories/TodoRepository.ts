import { DataSource, Repository } from 'typeorm';

import { TodoDto } from '@modules/todo/application/dtos/TodoDto';
import { Inject, Injectable } from '@nestjs/common';
import { TodoEntity } from '../entities/TodoEntity';

export const todoRepositoryProvider = [
  {
    provide: 'TODO_REPOSITORY',
    useFactory: (dataSource: DataSource): Repository<TodoEntity> =>
      dataSource.getRepository(TodoEntity),
    inject: ['DATA_SOURCE'],
  },
];

@Injectable()
export class TodoRepository {
  async deleteTodoByTitleOrReturnNull(
    title: string,
  ): Promise<TodoEntity | null> {
    const todo = await this.todoRepository.findOneBy({ title: title });
    if (todo) {
      return (await this.todoRepository.remove([todo]))[0];
    } else {
      return null;
    }
  }
  async updateTodoStatusOrReturnNull(
    todoDto: TodoDto,
  ): Promise<TodoEntity | null> {
    const oldtodo = await this.todoRepository.findOneBy({
      title: todoDto.title,
    });
    if (oldtodo) {
      oldtodo.status = todoDto.status;
      return this.todoRepository.save(oldtodo);
    }
    return null;
  }
  constructor(
    @Inject('TODO_REPOSITORY')
    private todoRepository: Repository<TodoEntity>,
  ) {}
  async getAllTodos(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }

  /**Creates todo with unique name or throws Error */
  async createTodoOrReturnNull(todo: TodoDto): Promise<TodoEntity | null> {
    if (await this.todoRepository.existsBy({ title: todo.title })) {
      return null;
    } else {
      const newTodo = this.todoRepository.create(todo);
      return this.todoRepository.save(newTodo);
    }
  }

  async getTodoByIdOrReturnNull(id: number): Promise<TodoEntity | null> {
    return this.todoRepository.findOne({ where: { id } });
  }
}
