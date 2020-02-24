import { HttpError } from "./HttpError";

export class UserFailedLogin extends HttpError{
    constructor(){
        super('User did not login', 400)
     }
   }