import {PoolClient} from 'pg';
import { connectionPool } from ".";
import { Reimbursement } from "../models/Reimbursement";
import { InternalServerError } from "../errors/InternalServerError";
import { reimbursementDTOToReimbursementConverter } from "../util/user-dto-to-user-converter";
import { ReimbursementNotFoundError } from "../errors/UserNotFoundError";

export async function daoFindReimbursementByStatusId(statusId:number):Promise<Reimbursement>{
  let client:PoolClient
  try {
    client = await connectionPool.connect()
    let results = await client.query('SELECT * FROM public.reimbursement R WHERE status_id = $1', [statusId])
       if(results.rowCount === 0){
            throw new Error('Reimbursement Not Found')
      }
         return reimbursementDTOToReimbursementConverter(results.rows[0])
    } catch(e){
      console.log(e);
      if(e.message === 'Reimbursement Not Found'){
          throw new ReimbursementNotFoundError();
      }
          throw new InternalServerError();    
   }
}

export async function daoFindReimbursementByUserId(userId:number):Promise<Reimbursement>{
  let client:PoolClient
  try {
    client = await connectionPool.connect()
    let results = await client.query('SELECT * FROM public.reimbursement R WHERE user_id = $1', [userId])
       if(results.rowCount === 0){
            throw new Error('Reimbursement Not Found')
      }
         return reimbursementDTOToReimbursementConverter(results.rows[0])
    } catch(e){
      console.log(e);
      if(e.message === 'Reimbursement Not Found'){
          throw new ReimbursementNotFoundError();
      }
          throw new InternalServerError();    
   }
}

export async function daoSaveOneReimbursement(reimbursement):Promise<Reimbursement> {
  let client:PoolClient
  try { 
   client = await connectionPool.connect()
   let result = await client.query('INSERT INTO public.reimbursement values ($1,$2,$3,$4,$5,$6,$7,$8,$9)', [
     reimbursement.reimbursmentId,
     reimbursement.author,
     reimbursement.amount,
     reimbursement.dateSubmitted,
     reimbursement.dateResolved,
     reimbursement.description,
     reimbursement.status,
     reimbursement.resolver,
     reimbursement.type
   ]
   );
      return reimbursementDTOToReimbursementConverter(result.rows[0])
} catch(e){
   throw new InternalServerError()
} finally {
   client && client.release()
}
}