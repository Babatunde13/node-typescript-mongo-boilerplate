import { BaseReq, BaseRes, MiddlewareResponse } from './api_contracts/base_request.ctrl.contract'
import { AppDBConnection } from './db_connection'

export interface ServerConfig {
    db: AppDBConnection
    port: number
    routes: Route[]
}

export enum HttpMethod {
    GET = 'get',
    POST = 'post'
}

export interface Route {
    path: string
    method: HttpMethod
    middlewares?: ((req: BaseReq) => MiddlewareResponse)[]
    handler: ((req: any) => BaseRes<any>)
}
