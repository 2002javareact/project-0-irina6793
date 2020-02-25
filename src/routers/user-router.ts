import * as express from 'express'
import { authFactory, authCheckId } from '../middleware/auth-middleware'
import { findAllUsers, saveOneUser, findUserById } from '../services/user-services'
import { User } from '../models/User'
import { UserDTO } from '../dtos/UserDTO'
import { Role } from '../models/Role'

export const userRouter = express.Router()

userRouter.get('/', [authFactory(['Admin']), async (req,res)=>{
    let users:User[] = await findAllUsers(); 
    res.json(User)
}]) 

userRouter.post('/login', async (req,res)=>{
  let { username, password
      }: {
        username:string,
        password:string
      }= req.body
        if(!username && !password){
            res.status(400).send('Please include username and password')
        } else {
            res.status(400).send('Please complete the remaining user fields')
        }
    })

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