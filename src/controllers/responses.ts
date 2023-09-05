import { Request, Response } from 'express'

import { Response as ResponseType } from '@types'
import { Response as ResponseClass } from 'orm/entities/responses'
import { responses, fields, users } from 'orm'

export const list = async (req: Request, res: Response) => {
    const response_list = await responses.find()

    return res.status(200).json(response_list.map((response) => response.to_JSON())).end()
}

export const create = async (req: Request, res: Response) => {
    const body = req.body as ResponseType

    const field_slug = body.field.split(' ')[1].slice(1, -1)
    const field = await fields.findOneBy({ slug: field_slug })

    const user_email = body.user.split(' ')[1].slice(1, -1)
    const user = await users.findOneBy({ email: user_email })

    const response = new ResponseClass({
        name: body.name,
        slug: body.slug,
        description: body.description,
        field: field!,
        user: user!,
        data: body.data,
    })

    await response.save()

    return res.status(201).json(response.to_JSON()).end()
}

export const get = async (req: Request, res: Response) => {
    const response = await responses.findOneBy({ slug: req.params.slug })

    return res.status(200).json(response!.to_JSON()).end()
}

export const update = async (req: Request, res: Response) => {
    const body = req.body as ResponseType

    const field_slug = body.field.split(' ')[1].slice(1, -1)
    const field = await fields.findOneBy({ slug: field_slug })

    const user_email = body.user.split(' ')[1].slice(1, -1)
    const user = await users.findOneBy({ email: user_email })

    const response = await responses.findOneBy({ slug: req.params.slug })

    response!.name = body.name
    response!.slug = body.slug
    response!.description = body.description
    response!.field = field!
    response!.user = user!
    response!.data = body.data

    await response!.save()

    return res.status(200).json(response!.to_JSON()).end()
}

export const remove = async (req: Request, res: Response) => {
    const response = await responses.findOneBy({ slug: req.params.slug })

    await response!.remove()

    return res.status(204).end()
}

export const access = async (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Access granted' }).end()
}
