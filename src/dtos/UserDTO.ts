export class UserDTO{
  userid: number
  username: string
  password:  string
  firstname: string
  lastname: string
  email: string
  roleid: number
  role: string

  constructor( 
    userid: number,
    username:string,
    password: string,
    firstname:string,
    lastname:string,
    email:string,
    roleid:number,
    role:string
    )

  { 
    this.userid = userid       
    this.username = username; 
    this.password = password;  
    this.firstname = firstname;
    this.lastname = lastname;  
    this.email = email;        
    this.roleid = roleid;      
    this.role = role;          
  }
}