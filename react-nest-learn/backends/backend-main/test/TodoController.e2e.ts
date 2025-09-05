import { TodoDto } from '@modules/application/dtos/TodoDto';
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
    test(' should create a new todo', async () => {
      const createTodo: TodoDto = { title: 'Test Todo' };

      const response = await request(testApp.app.getHttpServer())
        .post('/todos')
        .send(createTodo);

      expect(response.status).toBe(201);
      expect(response.body.title).toBe(createTodo.title);
      expect(response.body.id).toBeDefined();
    });
  });
  describe('Checking Todos List', () => {
    test('GET /todos', async () => {
      const response = await request(testApp.app.getHttpServer())
        .get('/todos/all')
        .send();
      
      expect(response.body).toHaveLength(1);
    });
  });
});
