import * as express from 'express'
import { authFactory, authCheckId } from '../middleware/auth-middleware'
import { findAllUsers, updateUser, findUserById } from '../services/user-services'
import { User } from '../models/User'
import { Role } from '../models/Role'

export const userRouter = express.Router()

userRouter.get('', [authFactory(['Admin','Finance-Manager']), async (req,res)=>{
    let users:User[] = await findAllUsers(); 
    res.json(users)
}])
 
userRouter.get('/:id', authFactory(['Admin', 'Finance-Manager']), authCheckId, async (req,res)=>{
       const id = +req.params.id 
       console.log(`this is the id   check me Router page ${req.params.id}`);
        
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

userRouter.patch("", [authFactory(["Admin"]),async (req, res) => {
        let {userId, username, firstName, lastName,  email, role}: {
             userId: number;
             username: string;
             firstName: string;
             lastName: string;
             email: string;
             role: string;
            } = req.body;
               if (userId && (username || firstName || lastName || email || role)) {          
                let update = await updateUser(req.body);
                res.json(update);
              }
            }
          ]);

