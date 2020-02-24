import { HttpError } from "./HttpError";

export class UserNotAllowed extends HttpError {
    constructor(){
        super('User Not Allowed', 403)
    }
}