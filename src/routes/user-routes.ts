import * as express from 'express'
import { User } from '../models/User'

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
        }
    
}