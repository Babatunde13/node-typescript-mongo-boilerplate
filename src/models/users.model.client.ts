import { IBaseModel } from './base_model.models'
import { Role } from './users.models.server'

export interface IUser extends IBaseModel {
    id: number
    username: string
    firstName: string
    lastName: string
    email: string
    role: Role
}
