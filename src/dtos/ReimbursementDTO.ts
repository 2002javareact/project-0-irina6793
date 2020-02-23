export class ReimbursementDTO{
      reimbursement_id: number 
	  author: number  
      amount: number  
      date_submitted: number 
      date_resolved: number 
      description: string 
      resolver: number 
      status: number 
      type: number 

  constructor(
    reimbursementId:number, 
    author:number,
    amount:number,
    dateSubmited:number, 
    dateResolved:number, 
    description:string, 
    resolver:number, 
    status:number, 
    type:number)

    {
       this.reimbursement_id=reimbursementId
       this.author=author
       this.amount=amount
       this.date_submitted=dateSubmited
       this.date_resolved=dateResolved
       this.description=description
       this.resolver=resolver
       this.status=status
       this.type=type
    }
}