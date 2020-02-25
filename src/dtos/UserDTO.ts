export class UserDTO {
     userId:number
     username:string
     password:string
     firstName:string
     lastName:string
     email:string
     role:string 
     roleId:number
      
    constructor(
        userId:number,
        username:string,
        password:string,
        firstName:string,
        lastName:string,
        email:string,
        roleId:number,
        role:string){
            this.username = username
            this.password = password
            this.email = email
            this.userId = userId
            this.firstName = firstName
            this.lastName = lastName
            this.roleId = roleId
            this.role=role
        }
     }