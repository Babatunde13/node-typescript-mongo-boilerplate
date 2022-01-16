import express, { Request, Response } from 'express'
import logger from 'morgan'
import { ServerConfig } from './server.types'

export const startServer = async (config: ServerConfig) => {
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.set('trust proxy', true)
    app.use(logger('tiny'))

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
        console.log(`Server listening on port ${config.port}`)
    })
}
