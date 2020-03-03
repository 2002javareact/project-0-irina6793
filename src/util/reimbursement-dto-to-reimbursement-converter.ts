import { ReimbursementDTO } from "../dtos/ReimbursementDTO";
import { Reimbursement } from "../models/Reimbursement";

export function reimbursementDTOToReimbursementConverter(ReimbursementDTO:ReimbursementDTO):Reimbursement{

    return new Reimbursement(
        ReimbursementDTO.reimbursementid,
        ReimbursementDTO.author,
        ReimbursementDTO.amount,
        ReimbursementDTO.datesubmitted,
        ReimbursementDTO.dateresolved,
        ReimbursementDTO.description,
        ReimbursementDTO.status,
        ReimbursementDTO.resolver,
        ReimbursementDTO.type
    )
}
