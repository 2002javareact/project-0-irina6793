import { ReimbursementDTO } from "../dtos/ReimbursementDTO";
import { Reimbursement } from "../models/Reimbursement";

export function reimbursementDTOToReimbursementConverter(ReimbursementDTO:ReimbursementDTO):Reimbursement{

    return new Reimbursement(
        ReimbursementDTO.reimbursementId,
        ReimbursementDTO.author,
        ReimbursementDTO.amount,
        ReimbursementDTO.dateSubmitted,
        ReimbursementDTO.dateResolved,
        ReimbursementDTO.description,
        ReimbursementDTO.status,
        ReimbursementDTO.resolver,
        ReimbursementDTO.type
    )
}
