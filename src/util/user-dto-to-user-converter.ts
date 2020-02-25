import { UserDTO } from "../dtos/UserDTO";
import { User } from "../models/User";
import { Role } from "../models/Role";

export function userDTOToUserConverter(userDTO:UserDTO):User{
    const role = new Role(userDTO.roleId, userDTO.role)
    return new User(
        userDTO.userId,
        userDTO.username,
        userDTO.password,
        userDTO.firstName,
        userDTO.lastName,
        userDTO.email,
        role
    )
}