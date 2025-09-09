import { DataSource } from 'typeorm';
import { ANOTHER_DATA_SOURCE } from '../../database/constants/DatabaseConstants';

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
        entities: ['/../../**/Entity{.ts,.js}'],
        // entities:[ErrorLogEntity],
        synchronize: true, //TODO:disable
      });

      const ds = await dataSource.initialize();
      return ds;
    },
    inject: [],
  },
];
