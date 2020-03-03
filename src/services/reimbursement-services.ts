import { daoFindReimbursementByStatusId, daoFindReimbursementByUserId, daoSubmitReimbursement, daoUpdateReimbursement } from "../repositories/reimbursement-dao";
import { Reimbursement } from "../models/Reimbursement";
import { ReimbursementDTO } from "../dtos/ReimbursementDTO";

export async function findReimbursementByStatusId(statusId:number): Promise<Reimbursement>{
    return await daoFindReimbursementByStatusId(statusId)
 }
 
 export async function findReimbursementByUserId(userId:number): Promise<Reimbursement>{
    return await daoFindReimbursementByUserId(userId)
 } 

 export async function submitReimbursement(reimbursement:Reimbursement): Promise<Reimbursement>{
    return await daoSubmitReimbursement(reimbursement)
 } 

 export async function updateReimbursement(update:Reimbursement): Promise<Reimbursement>{
     return await daoUpdateReimbursement(update)
 }

