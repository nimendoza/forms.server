import 'dotenv/config'
import 'reflect-metadata'

import { DataSource } from 'typeorm'

import { User } from 'orm/entities/users'
import { Privilege } from 'orm/entities/privileges'
import { Group } from 'orm/entities/groups'
import { Response } from 'orm/entities/responses'
import { Field } from 'orm/entities/fields'
import { Form } from 'orm/entities/forms'
import { Scope } from 'orm/entities/scopes'

export const data_source = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [
        'src/orm/entities/**/*.ts'
    ],
    migrations: [
        'src/orm/migrations/**/*.ts'
    ],
})

export const users = data_source.getRepository(User)
export const privileges = data_source.getRepository(Privilege)
export const groups = data_source.getRepository(Group)
export const responses = data_source.getRepository(Response)
export const fields = data_source.getRepository(Field)
export const forms = data_source.getRepository(Form)
export const scopes = data_source.getRepository(Scope)
