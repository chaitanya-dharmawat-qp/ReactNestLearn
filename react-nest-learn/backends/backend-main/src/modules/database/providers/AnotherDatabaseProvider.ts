import {DataSource} from 'typeorm'

export const anotherDatabaseProviders = [
  {
    provide: 'ANOTHER_DATA_SOURCE',
    useFactory: async (): Promise<DataSource> => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'todoUser',
        password: 'todoPwd',
        database: 'todoDb2',
        entities: [__dirname + '/../../**/*Entity{.ts,.js}'],
      })

      const ds = await dataSource.initialize()
      return ds
    },
    inject: [],
  },
]
