import * as express from 'express'
import { Reimbursement } from '../models/Reimbursement'
import { authFactory, authCheckId } from '../middleware/auth-midleware'
import { FindReimbursementByUserId, saveOneReimbursement } from '../services/user-service'

export const reimbursementRouter = express.Router()

reimbursementRouter.get('/status/:statusId', authFactory(['FinanceManager']), async (req,res)=>{
    const statusId = +req.params.statusId  
       if(isNaN(statusId)){
           res.sendStatus(400)
         }else {
             try{
                 let user = await daoFindReimbursementByStatusId(statusId);
                 res.json(user)
             }catch(e){
                 res.status(e.status).send(e.message)
             }
         }
     })

     reimbursementRouter.get('/user/:userId', authFactory(['FinanceManager']), async (req,res)=>{
        const userId = +req.params.userId  
           if(isNaN(userId)){
               res.sendStatus(400)
             }else {
                 try{
                     let user = await daoFindReimbursementByUserId(userId);
                 }catch(e){
                     res.status(e.status).send(e.message)
                 }
             }
         })

      reimbursementRouter.post('', authFactory(['Admin']), async (req,res)=>{
            let { author, amount, dateSubmitted, dateResolved, description,
                  resolver, status, type
                   } = req.body
                if(author&&amount&&dateSubmitted&&dateResolved&&description&&resolver&&status&&type){
                    let newUser = await saveOneReimbursement(new Reimbursement(
                        author,
                        amount,
                        dateSubmitted,
                        0,
                        dateResolved,
                        description,
                        resolver,
                        status,
                        type
                     ))
                    res.status(201)
                } else {
                    res.status(400).send('Please complete the remaining user fields')
                }
            })
