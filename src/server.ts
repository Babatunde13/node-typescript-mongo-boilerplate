import express, { NextFunction, Request, Response } from 'express'
import requestLogger from 'morgan'
import envs from './envs'
import { ServerConfig } from './server.types'
import logger from './shared/logger'
import { BaseReq, Response as BaseResponse } from './api_contracts/base_request.ctrl.contract'
import isError from './utils/is_error.utils'

const corsConfig = {
    // Methods we allow
    methods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
    // Allows all header
    headers: '*',
    // Allow requests from all domains
    origins: '*' // Allows all origins
}

export const startServer = async (config: ServerConfig) => {
    const connect = await config.db.connect()
    if (isError(connect) || !connect.data) {
        logger.error('Error connecting to database', connect.error)
    }

    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.set('trust proxy', true)
    if (envs.env !== 'test') {
        app.use(requestLogger('dev'))
    }

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', corsConfig.origins)
        res.header('Access-Control-Allow-Headers', corsConfig.headers)
        if (req.method === 'OPTIONS') {
            // preflight request
            res.header('Access-Control-Allow-Methods', corsConfig.methods)
            return res.status(200).json({})
        }

        next()
        return
    })

    config.routes.forEach((route) => {
        const middlewares = (route.middlewares || []).map((middleware) => {
            return async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const response = await middleware(req as BaseReq)
                    if ((response as BaseResponse<unknown>).success === false) {
                        return res.status((response as BaseResponse<unknown>).options?.status || 400).json(response)
                    } else {
                        return next()
                    }
                } catch (err) {
                    logger.error((err as Error).message)
                    return res.status(500).json({
                        success: false,
                        message: 'Internal server error',
                        data: null
                    })
                }
            }
        })

        app[route.method](route.path, ...middlewares, async (req, res) => {
            const { handler } = route
            const result = await handler(req)

            if (result) {
                res.status(200)
                if (result.options) {
                    console.log('result.options', result.options)
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
        
                return res.json(result)
            }

            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                data: null
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
        logger.info(`Server listening on port ${config.port} 🚀`, {
            type: 'server_start',
        })
    })

    return app
}

export default startServer
