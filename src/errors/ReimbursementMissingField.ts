import { HttpError } from "./HttpError";

export class ReimbursementMissingFields extends HttpError{
    constructor(){
        super('Missing Reimbursement Field', 400)
     }
   }