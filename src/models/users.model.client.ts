import { Role } from "./users.models.server";

export interface IUser {
    id: number
    username: string
    firstName: string
    lastName: string
    email: string
    role: Role
    createdAt: number
    updatedAt: number
}
