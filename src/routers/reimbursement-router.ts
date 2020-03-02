import * as express from 'express'
import { Reimbursement } from '../models/Reimbursement'
import { authFactory, authCheckId } from '../middleware/auth-middleware'
import { daoFindReimbursementByStatusId, daoFindReimbursementByUserId } from '../repositories/reimbursement-dao'
import { submitReimbursement, updateReimbursement } from '../services/reimbursement-services'

export const reimbursementRouter = express.Router()

reimbursementRouter.get('/status/:statusId', authFactory(['Admin', 'Finance-Manager']), async (req, res) => {
    const statusId = +req.params.statusId
    if (isNaN(statusId)) {
        res.sendStatus(400)
    } else {
        try {
            let reimbursement = await daoFindReimbursementByStatusId(statusId);
            res.json(reimbursement)
        }catch(e){
            res.status(e.status).send(e.message)
        }
    }
})

reimbursementRouter.get('/author/user/:userId', authFactory(['Admin','Finance-Manager']), async (req, res) => {
     const userId = +req.params.userId
     console.log(`hi im user id in router    ${userId}`);
     
     if(isNaN(userId)) {
         res.sendStatus(400)
     }else{
        try{
             let reimbursements = await daoFindReimbursementByUserId(userId);
             res.json(reimbursements)
           }catch(e){
             res.status(e.status).send(e.message)
         }
     }
 })

reimbursementRouter.post('', authFactory(['Admin', 'Finance-Manager']), async (req, res) => {
     const {author, amount, dateSubmitted, dateResolved, description, resolver, status, type
           } = req.body;
     if (author && amount && dateSubmitted && dateResolved && description && resolver && status && type) {
        let result = submitReimbursement(new Reimbursement(0, author, amount, dateSubmitted, dateResolved,
        description, resolver, status, type));
               res.status(201).json(result)
    } else {
         res.status(400).send('Please complete the remaining user fields')
      }
  })

  reimbursementRouter.patch("", [authFactory(["Admin", "Finance-Manager"]),async (req, res) => {
    let {author, amount, dateSubmitted, dateResolved, description, resolver, status, type}: {
         author: number;
         amount: number;
         dateSubmitted: number;
         dateResolved: number;
         description: string;
         resolver: number;
         status: number;
         type:number;
        } = req.body;
           if (author && (amount || dateSubmitted || dateResolved || description || resolver || status || type)) {          
            let update = await updateReimbursement(req.body);
            res.json(update);
          }
        }
      ]);