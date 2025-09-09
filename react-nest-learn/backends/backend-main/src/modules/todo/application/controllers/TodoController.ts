import { TodoEntity } from '@modules/todo/domain/entities/TodoEntity';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TodoDto } from '../dtos/TodoDto';
import { TodoService } from '../services/TodoService';
import { ITodo } from '../types/ITodo';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get('all')
  async getAllTodosOrThrowError(): Promise<TodoEntity[]> {
    const todo = await this.todoService.getTodosOrThrowError();
    return todo;
  }
  @Get(':id')
  async getTodoOrThrowError(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TodoEntity> {
    const todo = await this.todoService.getTodoByIdOrReturnNull(id);
    if (todo) {
      return todo;
    } else {
      throw new HttpException(
        `Todo With Id:${id} Not Found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
  @Post()
  async createTodoOrThrowError(@Body() todoDto: TodoDto): Promise<ITodo> {
    //100% up until this point title is not empty
    const newTodo =
      await this.todoService.createTodoWithUniqueNameOrThrowError(todoDto);
    Logger.log({ createdNewTodo: newTodo });
    return newTodo;
  }
  @Patch()
  async updateTodoStatusOrThrowError(
    @Body() todoDto: TodoDto,
  ): Promise<TodoEntity> {
    return this.todoService.updateTodoStatusOrThrowError(todoDto);
  }
  @Delete()
  async deleteTodoByTitleOrThrowError(
    @Query('title') title: string,
  ): Promise<TodoEntity> {
    return this.todoService.deleteTodoByTitleOrThrowError(title);
  }
}
