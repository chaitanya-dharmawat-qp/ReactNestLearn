// import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ErrorLogEntity')
export class ErrorLogEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true, type: 'int' })
  errorcode?: number;
  @Column({ nullable: false, type: 'varchar', length: 255 })
  errormessage: string;
}
