export const admin = 'Admin'
export const user = 'User'
export const financeManager = 'Finance-Manager'

export  class Role
{
    roleid: number 
    role: string

constructor(
    roleid: number, 
    role: string 
    )
{
    this.roleid = roleid
    this.role = role
}
}