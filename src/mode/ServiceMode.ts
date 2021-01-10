import * as http from 'http'

import cors from 'cors'
import express, { Request, Response, Router } from 'express'
import createError from 'http-errors'

import { DEFAULT_SERVICE_PORT } from '../constants/Constant'
import generateHowtoAsync from '../service/HowtoServiceAsync'

const ServiceMode = (_howtoRootDir: string | null, _port: string = DEFAULT_SERVICE_PORT): void => {
    const app = express()

    const configureApp = () => {
        app.use(express.json())
        app.use(express.urlencoded({ extended: false }))
        app.use(cors())

        app.set('port', _port)
        app.use(
            '/howto',
            express.Router().get('/', (req: Request, res: Response) => {
                try {
                    /*
              Example Requests
        
              ROOT: /home/maemresen/tmp
        
              req.originalUrl =
                /howto
                /howto/linux
                /howto/linux/specific_distro
            */
                    let categoryPath = ``
                    if (req.query.path) {
                        categoryPath += '/' + req.query.path
                    }

                    generateHowtoAsync(_howtoRootDir, categoryPath)
                        .then((result) => {
                            res.setHeader('Content-Type', 'application/json')
                            res.end(JSON.stringify(result))
                        })
                        .catch((err) => {
                            res.setHeader('Content-Type', 'application/json')
                            res.end(JSON.stringify(err))
                        })
                } catch (error) {
                    console.error(error)
                    res.json(error)
                }
            })
        )
        // catch 404 and forward to error handler
        app.use((req, res, next) => {
            next(createError(404))
        })
    }

    const startServer = () => {
        const server = http.createServer(app)
        server.listen(_port)
        server.on('error', (error: NodeJS.ErrnoException): void => {
            if (error.syscall !== 'listen') {
                throw error
            }

            // handle specific listen errors with friendly messages
            switch (error.code) {
                case 'EACCES':
                    console.error(_port + ' requires elevated privileges')
                    process.exit(1)
                    break
                case 'EADDRINUSE':
                    console.error(_port + ' is already in use')
                    process.exit(1)
                    break
                default:
                    throw error
            }
        })

        server.on('listening', () => {
            console.log('Listening on ' + _port)
        })
    }

    configureApp()
    startServer()
}

export default ServiceMode
