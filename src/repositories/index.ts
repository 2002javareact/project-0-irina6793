import { Pool } from 'pg';

export const connectionPool:Pool= new Pool({
/*
       host: process.env['PROJECT_0_HOST'],
       user: process.env['PROJECT_0_USER'],
       password: process.env['PROJECT_0_PASSWORD'],
       database: process.env['PROJECT_0_DATABASE'],
*/
host:process.env['WEBFLICKS_HOST'],//endpoint for db
user:process.env['WEBFLICKS_USER'],//user name
password:process.env['WEBFLICKS_PASSWORD'],//user password
database:process.env['WEBFLICKS_DBNAME'],//db name

       port: 5432,
       max: 5
})