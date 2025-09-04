
import {ITestApp, testSetupUtil} from '@test/TestSetupUtil'
import * as request from 'supertest'

describe('TodoController E2E Tests', () => {
  let testApp: ITestApp
  beforeEach(async () => {
    testApp = await testSetupUtil.startTestApp()
  })

  afterEach(async () => {
    await testSetupUtil.closeApp(testApp)
  })

  describe('POST /todos', () => {
    test(' should create a new todo', async () => {
      const createTodo: TodoDto = {title: 'Test Todo'}

      const response = await request(testApp.app.getHttpServer())
        .post('/todos')
        .send(createTodo)

      expect(response.status).toBe(201)
      expect(response.body.title).toBe(createTodo.title)
      expect(response.body.id).toBeDefined()
    })
  })
})
