import {User} from "../entities/user.entity";

export interface SignupDTO {
    email: string;
    password: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface UserResponseDTO {
    id: number;
    email: string;
}

export function toUserResponseDTO(user: User): UserResponseDTO {
    return {
        id: user.id,
        email: user.email,
    }
}
