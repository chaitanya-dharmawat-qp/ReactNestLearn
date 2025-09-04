import {Module} from '@nestjs/common'
import {TodoController} from './application/controllers/TodoController'
import {TodoService} from './application/services/TodoService'
import {InfraModule} from '@modules/infra/InfraModule'
import {
  TodoRepository,
  todoRepositoryProvider,
} from './domain/repositories/TodoRepository'
import { DatabaseModule } from '@modules/database/DatabaseModule'

@Module({
  imports: [InfraModule, DatabaseModule],
  controllers: [TodoController],
  providers: [TodoService, ...todoRepositoryProvider, TodoRepository],
  exports: [],
})
export class TodoModule {}