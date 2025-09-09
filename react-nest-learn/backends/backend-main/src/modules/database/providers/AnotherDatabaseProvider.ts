
import { ErrorLogEntity } from '@src/ExceptionFilter/entities/ErrorLogEntity';
import { DataSource } from 'typeorm';
import { ANOTHER_DATA_SOURCE } from '../constants/DatabaseConstants';

export const anotherDatabaseProviders = [
  {
    provide: ANOTHER_DATA_SOURCE,
    useFactory: async (): Promise<DataSource> => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'todoUser',
        password: 'todoPwd',
        database: 'errorLogDb',
        // entities: [__dirname + '/../../**/ErrorLogEntity{.ts,.js}'],
        entities:[ErrorLogEntity],
        synchronize: true,
      });

      const ds = await dataSource.initialize();
      return ds;
    },
    inject: [],
  },
];
