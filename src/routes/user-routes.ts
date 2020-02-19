import * as express from 'express'
import { User } from '../models/User'

export const userRoutes = express.Router()

userRoutes.get('', (req,res)=>{

})

userRoutes.post('', (req,res)=>{

    let { username, password, 

    emailAddress, id,

    firstName, lastName,

    role } = req.body
}