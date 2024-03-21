import { HttpMethod, Route } from './server.types'
import getUsersCtrl from './controllers/get_users.ctrl'
import requiresLogin from './middlewares/requires_login.middleware'
import requiresAdmin from './middlewares/requires_admin.middlewares'

const { GET } = HttpMethod

export const routes: Route[] = [
    {
        path: '/api/v1/users/',
        method: GET,
        middlewares: [requiresLogin, requiresAdmin],
        handler: getUsersCtrl
    },
    {
        path: '/api/v1/docs',
        method: GET,
        middlewares: [],
        handler: async () => {
                return {
                    success: true,
                    data: null,
                    message: '',
                    options: {
                        redirect: '/docs/index.html',
                        status: 302,
                    }
                }
            }
    },
    {
        path: '/',
        method: GET,
        middlewares: [],
        handler: async (req) => {
            return {
                success: true,
                data: null,
                message: `Welcome to Babatunde Boilerplate API, you cann access the <a href="${req.protocol}://${req.get('host')}/api/v1/docs">docs</a> here.`,
                options: {
                    sendString: true
                }
            }
        }
    }
]
