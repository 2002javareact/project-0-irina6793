import { daoFindUserByUsernameAndPassword, daoFindAllUsers, daoUpdateUser, daoFindUserById } from "../repositories/user-dao";
import { User } from "../models/User";
import { UserDTO } from "../dtos/UserDTO";

export async function findUserByUsernameAndPassword(username:string, password:string): Promise<User>{
   return await daoFindUserByUsernameAndPassword(username,password)
}

export async function findAllUsers():Promise<User[]>{

   console.log(`this is services   ${User} `);
   
   return await daoFindAllUsers()
}

export async function updateUser(newUser:any):Promise<User>{
    return await daoUpdateUser(newUser)
}

export async function findUserById(id:number):Promise<User>{
   return await daoFindUserById(id)
}