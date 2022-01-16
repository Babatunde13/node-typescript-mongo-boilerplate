import { BaseReq, BaseRes } from '../api_contracts/base_request.ctrl.contract'
import { decodeUser } from '../utils/jwt.utils'
import isError from '../utils/is_error.utils'
import User from 'src/models/users.models.server'

export default async function requiresLogin (req: BaseReq): BaseRes<null> {
    let token = req.headers['Authorization']
    if (!token || typeof token !== 'string' ||  token.split(' ')[0] !== 'Bearer') {
        return {
            success: false,
            data: null,
            message: 'Invalid token',
            options: {
                status: 401
            }
        }
    }
    token = token.split('')[1]
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
