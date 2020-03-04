import {PoolClient} from 'pg';
import { connectionPool } from ".";
import { Reimbursement } from '../models/Reimbursement';
import { InternalServerError } from "../errors/InternalServerError";
import { ReimbursementDTO } from "../dtos/ReimbursementDTO";
import { ReimbursementNotFound } from "../errors/ReimbursementNotFound";
import { reimbursementDTOToReimbursementConverter } from "../util/reimbursement-dto-to-reimbursement-converter";

export async function daoFindReimbursementByStatusId(statusId:number):Promise<Reimbursement>{
  let client:PoolClient
  try {
    client = await connectionPool.connect()
        let result = await client.query('select * from  project0.reimbursement r where status=$1 order by datesubmitted asc',[statusId]);
        if(result.rowCount === 0){
            throw new Error('User Not Found')
        }
          return reimbursementDTOToReimbursementConverter(result.rows[0])
      }catch(e){
        console.log("dao error " + e)
         if(e.message ==='User Not Found'){
           throw new ReimbursementNotFound()
      }
           throw new InternalServerError()
       }finally{
          client && client.release()
      }
  }
    
export async function daoFindReimbursementByUserId(userId:number):Promise<Reimbursement>{
  let client:PoolClient
  try {
    client = await connectionPool.connect()
    let results = await client.query('select * from  project0.reimbursement r where author=$1 order by datesubmitted desc', [userId]);
        if (results.rowCount === 0) {
         throw new Error("Reimbursement Not Found");
        }
     return reimbursementDTOToReimbursementConverter(results.rows[0]);
    }catch(e){
      console.log("dao error "+e)
      console.error(e.stack)
      if (e.message === "Reimbursement Not Found") {
        throw new ReimbursementNotFound();
      }
      throw new InternalServerError();
      } finally{
        client && client.release();
     }
   }

export async function daoSubmitReimbursement(newReimbursement:Reimbursement):Promise<Reimbursement> {
  let client:PoolClient
  try { 
   client = await connectionPool.connect()
   let result = await client.query('insert into project0.reimbursement(author, amount, datesubmitted, dateresolved, description, resolver, status, "type") values($1, $2, $3, $4, $5, $6, $7, $8)',
    [
      newReimbursement.author,
      newReimbursement.amount,
      newReimbursement.dateSubmitted,
      newReimbursement.dateResolved,
      newReimbursement.description,
      newReimbursement.status,
      newReimbursement.resolver,
      newReimbursement.type
    ]   
  );
  newReimbursement.reimbursementId = result.rows[0].reimbursementId; 
    return newReimbursement;
   }catch(e){
    console.log("dao error " + e)

      throw new InternalServerError;
    }finally {
      client && client.release();
  }
}

export async function daoUpdateReimbursement(newReimbursement:Reimbursement):Promise<Reimbursement> {
  let client:PoolClient
  try { 
    client = await connectionPool.connect()
    let reimbursementId = newReimbursement.reimbursementId;
    let prevReimbursement = (await client.query('SELECT * FROM project0."reimbursement"', [reimbursementId])).rows[0];
      prevReimbursement.author = newReimbursement || prevReimbursement.author,
      prevReimbursement.amount = newReimbursement || prevReimbursement.amount,
      prevReimbursement.dateSubmitted = newReimbursement || prevReimbursement.dateSubmitted,
      prevReimbursement.dateResolved = newReimbursement || prevReimbursement.dateResolved,
      prevReimbursement.description = newReimbursement || prevReimbursement.description,
      prevReimbursement.status = newReimbursement || prevReimbursement.status,
      prevReimbursement.resolver = newReimbursement || prevReimbursement.resolver,
      prevReimbursement.type = newReimbursement || prevReimbursement.type,
    
    await client.query(
      'UPDATE project0."reimbursement"',
    [
      prevReimbursement.author,
      prevReimbursement.amount,
      prevReimbursement.date_submitted,
      prevReimbursement.date_resolved,
      prevReimbursement.description,
      prevReimbursement.resolver,
      prevReimbursement.status,
      prevReimbursement.type,
      reimbursementId
    ]
  );
     return prevReimbursement;
    }catch(e){
      console.log("dao error " + e)
       throw new InternalServerError();
  }finally{
       client && client.release
  }
}