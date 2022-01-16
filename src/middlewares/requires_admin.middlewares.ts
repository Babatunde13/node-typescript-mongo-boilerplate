import { BaseReq } from '../api_contracts/base_request.ctrl.contract'
import { Role } from '../models/users.models.server'

export default async function requiresAdmin (req: BaseReq) {
    const user = req.user
    if (!user || user.role !== Role.ADMIN) {
        return {
            success: false,
            data: null,
            message: 'forbidden',
            options: {
                status: 401
            }
        }
    }
}
