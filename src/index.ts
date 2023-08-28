import { payload } from 'utils'
import { privileges } from 'orm/entities/privileges'

declare global {
    namespace Express {
        interface Request {
            payload?: payload
            requires?: privileges
            scope?: string
        }
    }
}

import path from 'path'
import dotenv from 'dotenv'

const ENV_PATH = path.resolve(__dirname, '../.env')
console.log(`Loading environment variables from ${ENV_PATH}`)

dotenv.config({ path: ENV_PATH })

import 'reflect-metadata'

import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import fs from 'fs'
import helmet from 'helmet'
import morgan from 'morgan'

import routes from 'routes'

import { data_source } from 'orm'

export const app = express()
app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

try {
    const access_log = fs.createWriteStream(path.resolve(__dirname, '../access.log'), { flags: 'a' })
    app.use(morgan('combined', { stream: access_log }))
} catch (error) {
    console.error(error)
    app.use(morgan('combined'))
}

app.use(routes)

const start = async (port: Number) => {
    try {
        await data_source.initialize()
        console.log('Connected to database')
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`)
        })
    } catch (error) {
        console.error(error)
    }
}

start(Number(process.env.PORT) || 6000)
