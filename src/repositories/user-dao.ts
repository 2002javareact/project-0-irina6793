import { PoolClient } from 'pg';
import { connectionPool } from ".";

export async function daoFindUserByUsernameAndPassword(username:string, password:string)
   let client:PoolClient




