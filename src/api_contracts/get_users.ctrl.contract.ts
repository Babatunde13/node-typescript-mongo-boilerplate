import { ReqWithParams, BaseRes } from './base_request.ctrl.contract'
import { IUser } from '../models/users.model.client'

export interface ClientReq {
    query: {
        limit: string
    }
}

export type ClientRes = IUser[]

export type Req = ReqWithParams<ClientReq>
export type Res = BaseRes<ClientRes>
