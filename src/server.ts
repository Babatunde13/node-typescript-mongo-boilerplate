import express, { Request, Response } from 'express'
import requestLogger from 'morgan'
import envs from './envs'
import { ServerConfig } from './server.types'
import logger from './shared/logger'

export const startServer = async (config: ServerConfig) => {
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.set('trust proxy', true)
    if (envs.env !== 'test') {
        app.use(requestLogger('dev'))
    }

    config.routes.forEach((route) => {
        app[route.method](route.path, async (req: Request, res: Response) => {
            return route.handlers.forEach(async (handler) => {
                const result = await handler(req)
                if (result) {
                    if (result.options) {
                        if (result.options.status) {
                            res.status(result.options.status)
                        }
                        if (result.options.redirect) {
                            res.redirect(result.options.redirect)
                            return
                        }
                        if (result.options.sendString) {
                            res.send(result.message)
                            return
                        }
                        delete result.options
                    }
                    res.json(result)
                }
            })

        })
    })

    app.use('*', (req, res) => {
        res.status(404).json({
            success: false,
            message: 'Resource not found',
            data: null
        })
    })

    app.listen(config.port, () => {
        logger.info(`Server listening on port ${config.port} 🚀`, 'Server Startup')
    })

    return app
}

export default startServer
