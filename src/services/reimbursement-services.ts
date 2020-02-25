import { daoFindReimbursementByStatusId, daoFindReimbursementByUserId, daoSaveOneReimbursement } from "../repositories/reimbursement-dao";
import { Reimbursement } from "../models/Reimbursement";

export async function findReimbursementByStatusId(statusId:number): Promise<Reimbursement>{
    return await daoFindReimbursementByStatusId(statusId)
 }
 
 export async function findReimbursementByUserId(userId:number): Promise<Reimbursement>{
    return await daoFindReimbursementByUserId(userId)
 } 

 export async function saveOneReimbursement(reimbursement:number): Promise<Reimbursement>{
    return await daoSaveOneReimbursement(reimbursement)
 } 
