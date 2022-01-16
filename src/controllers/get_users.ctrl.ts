import { Req, Res } from '../api_contracts/get_users.ctrl.contract'
import User from '../models/users.models.server';

/**
 * Get all users
 */
export default async function getUsersCtrl (req:Req): Res {
    const findOptions = {
        limit: req.query.limit || 10
    }
    const users = await User.find({}, findOptions)
    return {
        success: true,
        data: users,
        message: '',
        options: {
            sendString: true
        }
    }
}
