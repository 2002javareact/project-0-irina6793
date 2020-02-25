import * as express from 'express'
import { Reimbursement } from '../models/Reimbursement'
import { authFactory, authCheckId } from '../middleware/auth-middleware'
import { daoFindReimbursementByStatusId, daoFindReimbursementByUserId } from '../repositories/reimbursement-dao'
import { saveOneReimbursement } from '../services/reimbursement-services'

export const reimbursementRouter = express.Router()

reimbursementRouter.get('/status/:statusId', authFactory(['FinanceManager']), async (req, res) => {
    const statusId = +req.params.statusId
    if (isNaN(statusId)) {
        res.sendStatus(400)
    } else {
        try {
            let user = await daoFindReimbursementByStatusId(statusId);
            res.json(user)
        } catch (e) {
            res.status(e.status).send(e.message)
        }
    }
})

reimbursementRouter.get('/user/:userId', authFactory(['FinanceManager']), async (req, res) => {
    const userId = +req.params.userId
    if (isNaN(userId)) {
        res.sendStatus(400)
    } else {
        try {
            let user = await daoFindReimbursementByUserId(userId);
        } catch (e) {
            res.status(e.status).send(e.message)
        }
    }
})

reimbursementRouter.post('', authFactory(['Admin']), async (req, res) => {
    const { author, amount, dateSubmitted, dateResolved, description,
        resolver, status, type
    } = req.body;
    try {
        if (author && amount && dateSubmitted && dateResolved && description && resolver && status && type) {
            let result = saveOneReimbursement(new Reimbursement(
                0,
                author,
                amount,
                dateSubmitted,
                dateResolved,
                description,
                resolver,
                status,
                type
            ));
            res.status(201).json(result)
        } else {
            res.status(400).send('Please complete the remaining user fields')
        }
    } catch(e){

    }
})
