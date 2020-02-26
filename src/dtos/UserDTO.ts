export class UserDTO {
     userId:number
     username:string
     password:string
     first_name:string
     last_name:string
     email:string
     role:string 
      
    constructor(
        userId:number,
        username:string,
        password:string,
        firstName:string,
        lastName:string,
        email:string,
        role:string) {
           this.userId = userId
           this.username = username
           this.password = password
           this.first_name = firstName
           this.last_name = lastName
           this.email = email
           this.role=role
       }
    }