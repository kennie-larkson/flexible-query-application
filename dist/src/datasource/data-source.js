"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
exports.default = new typeorm_1.DataSource({
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
