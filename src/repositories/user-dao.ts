import { PoolClient } from 'pg';
import { connectionPool } from ".";
import { User } from "../models/User";
import { InternalServerError } from "../errors/InternalServerError";
import { userDTOToUserConverter } from "../util/user-dto-to-user-converter";
import { UserNotFoundError } from "../errors/UserNotFoundError";
import { BadCredentialsError } from "../errors/BadCredentialsError"
import { findUserById } from '../services/user-services';

export async function daoFindUserByUsernameAndPassword(username:string,password:string):Promise<User>{
    let client:PoolClient
    try {
        client = await connectionPool.connect()
        let results = await client.query('select * from project0."user" as u inner join project0."role" as r on u."userid"=r.roleid WHERE username = $1  and "password" = $2',[username,password]);
        if(results.rowCount === 0){
             throw new Error('User Not Found')
        }
       return userDTOToUserConverter(results.rows[0])
    }catch(e){
        if(e.message === 'User Not Found'){
            throw new BadCredentialsError();
        }else{
            throw new InternalServerError();
        }
      }finally{
        client && client.release();
    }
}

export async function daoFindAllUsers():Promise<User[]>{
       let client:PoolClient
       try{
           client = await connectionPool.connect()
           //console.log(`This is dao    User before sellection ${User}`);
           
           let results = await client.query('select * from project0."user" as u inner join project0."role" as r on u."userid"=r.roleid');
           return results.rows.map(userDTOToUserConverter);
       }catch(e){
           throw new InternalServerError()
       }finally{
        client && client.release()
    }
}
export async function daoUpdateUser(newUser:User):Promise<User> {
       let client:PoolClient
       try { 
        client = await connectionPool.connect()
        let userId = newUser.userId
        let prevUser = await findUserById(userId);

        prevUser.userName = newUser.userName || prevUser.userName;
        prevUser.firstName = newUser.firstName || prevUser.firstName;
        prevUser.lastName = newUser.lastName || prevUser.lastName;
        prevUser.email = newUser.email || prevUser.email;
        prevUser.role = newUser.role || prevUser.role;
 
        await client.query(
            'UPDATE project0."user" set username = $1, firstname = $2, lastname = $3, email = $4, role = $5 WHERE userid = $6',
            [
                prevUser.userName, 
                prevUser.email,
                prevUser.firstName, 
                prevUser.lastName, 
                prevUser.role
             ]
            )

          return prevUser
       }catch(e){
          throw new InternalServerError()
       }finally {
           client && client.release()
       }
     }

export async function daoFindUserById(id:number):Promise<User>{
    let client:PoolClient
    try{


        console.log(`Hello iam User From Dao Before Hit DB ${id} `);
        
        client = await connectionPool.connect()
        let result = await client.query('select * from project0."user" u , project0."role" r where u."role" =r.roleid and U.userid = $1', [id]);
        if(result.rowCount === 0)
        {
            throw new Error('User Not Found')
        }
        return userDTOToUserConverter(result.rows[0])
      }catch(e){
        if(e.message ==='User Not Found'){
            throw new UserNotFoundError()
        }
           throw new InternalServerError()
        }finally{
        client && client.release()
        }
    }
