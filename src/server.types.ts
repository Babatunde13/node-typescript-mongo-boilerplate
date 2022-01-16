import { BaseRes } from './api_contracts/base_request.ctrl.contract'

export interface ServerConfig {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handlers: ((req: any) => BaseRes<any>)[]
}
