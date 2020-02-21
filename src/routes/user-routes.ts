import * as express from 'express'
import { users } from '../database'
import { User } from '../models/Users'
import { authFactory, authCheckId } from '../middleware/auth-middleware'

export const userRoutes = express.Router()

userRoutes.get('', (req,res)=>{
    res.json(User)
}) 

userRoutes.post('', (req,res)=>{
    let { username, password, 
        emailAddress, id,
        firstName, lastName,
        role } = req.body
        if(username && password && emailAddress && id && firstName && lastName && role){
            user.push(new User(username,password,emailAddress,id,firstName,lastName,role))
            res.sendStatus(201)
        } else {
            res.status(400).send('Please complete')
        }

