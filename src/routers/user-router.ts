import * as express from 'express'
import { User } from '../models/User'
import { authFactory, authCheckId } from '../middleware/auth-middleware'

export const userRouter = express.Router()

userRouter.get('', [authFactory(['Admin']), (req,res)=>{
    res.json(User)
}]) 

userRouter.post('', authFactory(['Admin']), (req,res)=>{
    let { username, password, 
        emailAddress, id,
        firstName, lastName,
        role } = req.body
        if(username && password && emailAddress && id && firstName && lastName && role){
            users.push(new User(username,password,emailAddress,id,firstName,lastName,role))
            res.sendStatus(201)
        } else {
            res.status(400).send('Please complete')
        }
    })
  userRouter.get('/:id', authFactory(['Admin', 'User']), authCheckId, (req,res)=>{
       const id = +req.params.id  
          if(isNaN(id)){
              res.sendStatus(400)
            }else {
              let found = false
                 for(let user of users){    
                    if(user.id === id){
                        found=true
                          res.status(200).json(user)
                  }
                }
            if(!found){
               res.sendStatus(404)
            }
        }
    })