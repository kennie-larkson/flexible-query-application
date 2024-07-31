import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'kennie',
  password: '12345678',
  database: 'queryapp_db',
  synchronize: false,
  dropSchema: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  migrationsTableName: 'migration_table',
  //migrationsTableName: 'custom_migration_table',
});
