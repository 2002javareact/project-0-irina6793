import { PoolClient } from 'pg';
import { connectionPool } from ".";
import { User } from "../models/User";
import { InternalServerError } from "../errors/InternalServerError";
import { userDTOToUserConverter } from "../util/user-dto-to-user-converter";
import { UserDTO } from "../dtos/UserDTO";
import { UserNotFoundError } from "../errors/UserNotFoundError";

export async function daoFindUserByUsernameAndPassword(username:string,password:string):Promise<User>{
    let client:PoolClient
    try {
        client = await connectionPool.connect()
        let results = await client.query('SELECT * FROM public.users U inner join public.roles R on U."role" = R.role_id  WHERE username = $1  and "password" = $2', [username,password])
        if(results.rowCount === 0){
             throw new Error('User Not Found')
        }
       return userDTOToUserConverter(results.rows[0])
    } catch(e){
        console.log(e);
        if(e.message === 'User Not Found'){
            throw new UserNotFoundError();
        }
            throw new InternalServerError();    
     }
}
    export async function daoFindAllUsers():Promise<User[]>{
       let client:PoolClient
       try{
           client = await connectionPool.connect()
           let results = await client.query('SELECT * FROM public.users U inner join public.roles R on U."role" = R.role_id')
           return results.rows.map(userDTOToUserConverter)
    }catch(e){
        throw new InternalServerError()
    } finally {
        client && client.release()
    }
}

export async function daoSaveOneUser(newUser:User):Promise<User> {
       let client:PoolClient
       try { 
        client = await connectionPool.connect()
        let roleId = (await client.query('SELECT * FROM public.roles WHERE role = $1', [newUser.roleId])).rows[0].role_id
        let result = await client.query('INSERT INTO public.users (username, "password", email, first_name, last_name, "role") values ($1,$2,$3,$4,$5,$6) RETURNING user_id;',
        [newUser.username, newUser.password, newUser.email, newUser.firstName, newUser.lastName, roleId])
        newUser.userId = result.rows[0].user_id
        return userDTOToUserConverter(userDTO)
    } catch(e){
        throw new InternalServerError()
    } finally {
        client && client.release()
    }
}

export async function daoFindUserById(id:number):Promise<User>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let result = await client.query('SELECT * FROM public.users U inner join public.roles R on U."role" = R.role_id WHERE U.user_id = $1', [id])
        if(result.rowCount === 0){
            throw new Error('User Not Found')
        }
        return userDTOToUserConverter(result.rows[0])
      }catch(e){
        if(e.message ==='User Not Found'){
            throw new UserNotFoundError()
        }
        throw new InternalServerError()
    } finally {
        client && client.release()
    }
}
