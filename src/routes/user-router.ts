import * as express from 'express'
import { Users } from '../models/Users'
import { authFactory, authCheckId } from '../middleware/auth-middleware'

export const userRouter = express.Router()

userRouter.get('', (req,res)=>{
    res.json(Users)
}) 

userRouter.post('', (req,res)=>{
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

