import { BaseReq, MiddlewareResponse } from '../api_contracts/base_request.ctrl.contract'
import { decodeUser } from '../utils/jwt.utils'
import isError from '../utils/is_error.utils'
import User from '../models/users.models.server'
import { isJwt } from '../utils/validator'

export default async function requiresLogin (req: BaseReq): MiddlewareResponse {
    const authHeader = req.headers['Authorization']
    if (!authHeader || typeof authHeader !== 'string' ||  authHeader.split(' ')[0] !== 'Bearer') {
        return {
            success: false,
            data: null,
            message: 'Invalid token',
            options: {
                status: 401
            }
        }
    }

    const token = authHeader.split('')[1]
    if (!isJwt(authHeader)) {
        return {
            success: false,
            data: null,
            message: 'Invalid token',
            options: {
                status: 401
            }
        }
    }
    console.log('token', token)
    const decodedUser = await decodeUser(token)
    if (isError(decodeUser)) {
        return {
            success: false,
            data: null,
            message: 'Invalid token',
            options: {
                status: 401
            }
        }
    }

    console.log('decodedUser', decodedUser)
    const user = await User.findOne({ _id: decodedUser.data })
    if (!user) {
        return {
            success: false,
            data: null,
            message: 'Invalid token',
            options: {
                status: 401
            }
        }
    }

    req.user = user
}
