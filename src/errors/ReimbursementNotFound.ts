import { HttpError } from "./HttpError";

export class ReimbursementNotFound extends HttpError{
    constructor(){
        super('Reimbursement Info Not Found', 400)
     }
   }