import * as express from 'express'
import { authFactory, authCheckId } from '../middleware/auth-midleware'
import { findAllUsers, updateUser, findUserById } from '../services/user-services'
import { User } from '../models/User'
import { Role } from '../models/Role'
import { UserDTO } from "../dtos/UserDTO";

export const userRouter = express.Router()

userRouter.get('', [authFactory(['Admin', 'Finance-Manager']),  async (req,res)=>
{
    let users:User[] = await findAllUsers(); 
    res.json(users)
}])
 
userRouter.get('/:id', authFactory(['Admin', 'Finance-Manager']), authCheckId, async (req,res)=>{
       const id = +req.params.id 
         if(isNaN(id)){
              res.sendStatus(400)
            }else {
                try{
                    let users = await findUserById(id)
                    res.json(users)
                }catch(e){
                    res.status(e.status).send(e.message)
                }
            }
        })

userRouter.patch('', authFactory(['Admin']), async (req,res)=>
{
        let {userid, username,password, firstname, lastname,  email, role}: {
             userid: number;
             username: string;
             password:string;
             firstname: string;
             lastname: string;
             email: string;
             role: Role;
            } = req.body;

let user:UserDTO=new UserDTO( userid, username, password, firstname, lastname,  email, role.roleid, role.role)
       if (userid && (username || firstname || password ||lastname || email || role)) {          
                let update = await updateUser(req.body);
                res.json(update);
              }
            }
          );
