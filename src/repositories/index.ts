import { Pool } from 'pg';

export const connectionPool:Pool= new Pool({
       host: process.env['PROJECT_0_HOST'],
       user: process.env['PROJECT_0_USER'],
       password: process.env['PROJECT_0_PASSWORD'],
       database: process.env['PROJECT_0_DATABASE'],
       port: 5432,
       max: 5
})