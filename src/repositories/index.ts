import { Pool } from 'pg';

export const connectionPool:Pool= new Pool({
      host:  process.env[//put data from computer'], //endpoint for db
      user: process.env
      password: process.env
      database: process.env
      port: 5432,
      max: 5
})