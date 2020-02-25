import * as express from 'express'
import { authFactory, authCheckId } from '../middleware/auth-middleware'
import { findAllUsers, saveOneUser, findUserById } from '../services/user-services'
import { User } from '../models/User'
import { UserDTO } from '../dtos/UserDTO'
import { Role } from '../models/Role'

export const userRouter = express.Router()

userRouter.get('', [authFactory(['Admin']), async (req,res)=>{
    let users:User[] = await findAllUsers(); 
    res.json(User)
}]) 

userRouter.patch('/', authFactory(['Admin']), async (req,res)=>{
  let { username, password, emailAddress, id, firstName, lastName, role
      }: {
        username:string,
        password:string,
        emailAddress:string,
        id:number,
        firstName:string,
        lastName:string,
        role:string
      }= req.body
        if(username && password && emailAddress && id && firstName && lastName && role){
        let role1:Role =new Role(
            0,
            ""
        )
        let newUser = await saveOneUser(new User(
            id,
            username,
            password,
            firstName,
            lastName,
            emailAddress,
            role1
            
        ))
            res.status(201).json(newUser)
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