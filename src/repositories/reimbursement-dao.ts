import {PoolClient} from 'pg';
import { connectionPool } from ".";
import { Reimbursement } from '../models/Reimbursement';
import { InternalServerError } from "../errors/InternalServerError";
import { reimbursementDTOToReimbursementConverter } from "../util/reimbursement-dto-to-reimbursement-converter";

export async function daoFindReimbursementByStatusId(statusId:number):Promise<Reimbursement>{
  let client:PoolClient
  try {
    client = await connectionPool.connect()
    const results = await client.query('SELECT * FROM project0.reimbursement R WHERE status_id = $1', [statusId]);
        return reimbursementDTOToReimbursementConverter(results.rows[0]);
    } catch(e){
      throw new InternalServerError();    
    } finally {
      client && client.release();
    }
  }

  export async function daoFindReimbursementByUserId(userId:number):Promise<Reimbursement>{
  let client:PoolClient
  try {
    client = await connectionPool.connect()
    let results = await client.query('SELECT * FROM project0.reimbursement R WHERE user_id = $1', [userId])
    return reimbursementDTOToReimbursementConverter(results.rows[0]);
    } catch(e){
      throw new InternalServerError();    
    }
    finally{
        client && client.release();
     }
   }

export async function daoSaveOneReimbursement(reimbursement):Promise<Reimbursement> {
  let client:PoolClient
  try { 
   client = await connectionPool.connect()
   let result = await client.query('INSERT INTO project0.reimbursement (reimbursement_id)', [
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
   throw new InternalServerError;
    } finally {
   client && client.release();
  }
}
