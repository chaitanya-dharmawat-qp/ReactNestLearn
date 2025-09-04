import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';
import { TodoService } from '../services/TodoService';
import { ITodo } from '../types/ITodo';
import { TodoDto } from '../dtos/TodoDto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get(':id')
  getTodo(@Param('id', ParseIntPipe) id: number): ITodo {
    const todo = this.todoService.getTodoById(id);
    if (!todo) {
      return { id, title: `Todo with ID ${id} not found`, status: 'completed' };
    }
    return todo;
  }

  @Post()
  createTodo(@Body() todoDto: TodoDto): ITodo {
    const newTodo = this.todoService.createTodo(todoDto.title);
    return newTodo;
  }
}
