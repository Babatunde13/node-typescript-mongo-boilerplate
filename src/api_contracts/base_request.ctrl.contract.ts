import { Request } from 'express'
import { IUser } from '../models/users.model.client'

export type BaseReq = Request  & {
    params: { [key: string]: string | undefined }
    query: { [key: string]: string | undefined }
    user: IUser
}

export type ReqWithParams<T> = BaseReq & T

export type Response<T> =  {
	success: boolean
    message: string
	data: T
    options?: {
        status?: number
        redirect?: string
        sendString?: boolean
    }
}

export type BaseRes<T> = Promise<Response<T>>
export type MiddlewareResponse<T=null> = Promise<Response<T> | void>
