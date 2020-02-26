import * as express from 'express'
import { authFactory, authCheckId } from '../middleware/auth-middleware'
import { findAllUsers, saveOneUser, findUserById } from '../services/user-services'
import { User } from '../models/User'
import { UserDTO } from '../dtos/UserDTO'
import { Role } from '../models/Role'

export const userRouter = express.Router()

userRouter.get('/', [authFactory(['Admin','Finance_Manager']), async (req,res)=>{
    let users:User[] = await findAllUsers(); 
    res.json(User)
}]) 


  userRouter.get('/:id', authFactory(['Admin', 'User']), authCheckId, async (req,res)=>{
       const id = +req.params.id  
          if(isNaN(id)){
              res.sendStatus(400)
            }else {
                try{
                    let user = await findUserById(id)
                    res.json(user)
                }catch(e){
                    res.status(e.status).send(e.message)
                }
            }
        })