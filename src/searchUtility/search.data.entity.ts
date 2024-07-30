import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Data {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  capacity: number;

  @Column()
  userId: number;
}
