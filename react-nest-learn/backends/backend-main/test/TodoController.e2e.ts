import { TodoDto } from '@modules/todo/application/dtos/TodoDto';
import { HttpStatus } from '@nestjs/common';
import { ITestApp, testSetupUtil } from '@test/TestSetupUtil';
import * as request from 'supertest';

describe('TodoController E2E Tests', () => {
  let testApp: ITestApp;
  beforeAll(async () => {
    testApp = await testSetupUtil.startTestApp();
  });

  //This should be afterAll not after each
  afterAll(async () => {
    await testSetupUtil.closeApp(testApp);
  });

  describe('POST /todos', () => {
    test('should throw error while creating todo that title cannot be empty Bad Request:400', async () => {
      const createTodo: TodoDto = { title: '', status: 'active' };
      const response = await request(testApp.app.getHttpServer())
        .post('/todos')
        .send(createTodo);
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('POST /todos', () => {
    test('should create a new todo and return newly created todo Dto with Id', async () => {
      const createTodo: TodoDto = { title: 'Test Todo', status: 'active' };
      const response = await request(testApp.app.getHttpServer())
        .post('/todos')
        .send(createTodo);
      expect(response.status).toBe(201);
      expect(response.body.title).toBe(createTodo.title);
      expect(response.body.id).toBeDefined();
    });
  });

  describe('POST /todos', () => {
    test('should throw error as Todo with Name already exists', async () => {
      const createTodo: TodoDto = { title: 'Test Todo', status: 'active' };
      const response = await request(testApp.app.getHttpServer())
        .post('/todos')
        .send(createTodo);
      expect(response.status).toBe(HttpStatus.CONFLICT);
    });
  });

  describe('GET /todos', () => {
    test('should throw error while fetching todos by id Todo Not Found with Id :<id>', async () => {
      const response = await request(testApp.app.getHttpServer())
        .get('/todos/10')
        .send();
      expect(response.status).toBe(HttpStatus.NOT_FOUND);
    });
  });

  describe('GET /todos', () => {
    test('should fetch todo by id Todo : Found', async () => {
      const response = await request(testApp.app.getHttpServer())
        .get('/todos/1')
        .send();
      expect(response.status).toBe(HttpStatus.OK);
    });
  });

  describe('Update /todos', () => {
    test('should update todos status to completed/active', async () => {
      const updateTodo: TodoDto = { title: 'Test Todo', status: 'completed' };
      const response = await request(testApp.app.getHttpServer())
        .patch('/todos/')
        .send(updateTodo);
      expect(response.status).toBe(HttpStatus.OK);
    });
  });
  describe('Update /todos', () => {
    test('should throw error that "todo title cannot be empty"', async () => {
      const updateTodo: TodoDto = { title: '', status: 'completed' };
      const response = await request(testApp.app.getHttpServer())
        .patch('/todos/')
        .send(updateTodo);
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });
  describe('Delete /todos', () => {
    test('should throw error "todo not found"', async () => {
      const deletingTodoDto: TodoDto = {
        title: 'Test Todo Dummy',
        status: 'completed',
      };
      const response = await request(testApp.app.getHttpServer())
        .delete('/todos/')
        .query(deletingTodoDto)
        .send();
      expect(response.status).toBe(HttpStatus.NOT_FOUND);
    });

  describe('Delete /todos', () => {
      test('should delete todo and return Status OK', async () => {
        const deletingTodoDto: TodoDto = {
          title: 'Test Todo',
          status: 'completed',
        };
        const response = await request(testApp.app.getHttpServer())
          .delete('/todos/')
          .query(deletingTodoDto)
          .send();
        expect(response.status).toBe(HttpStatus.OK);
      });
    });
  });
});
