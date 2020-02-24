export const admin = "Admin";
export const user = "User";
export const financeManager = "FinanceManager";

export class Role {
    roleId: number;
    role: string;

    constructor(
        roleId:number,
        role:string
    )
    {
        this.roleId=roleId;
        this.role=role;
    }
}