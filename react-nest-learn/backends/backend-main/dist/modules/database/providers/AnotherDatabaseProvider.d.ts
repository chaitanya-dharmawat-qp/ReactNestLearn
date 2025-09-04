import { DataSource } from 'typeorm';
export declare const anotherDatabaseProviders: {
    provide: string;
    useFactory: () => Promise<DataSource>;
    inject: never[];
}[];
