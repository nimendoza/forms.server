import { Request, Response, NextFunction } from 'express'

import { Response as ResponseType } from '@types'
import { responses, fields, users } from 'orm'
import { validator } from 'utils'

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body as ResponseType

    if (validator.is_empty(body.name)) {
        return res.status(400).json({ message: 'The name field is required' }).end()
    }

    if (validator.is_empty(body.slug)) {
        return res.status(400).json({ message: 'The slug field is required' }).end()
    }

    const response = await responses.findOneBy({ slug: body.slug })

    if (response) {
        return res.status(400).json({ message: 'Slug already exists' }).end()
    }

    if (validator.is_empty(body.description)) {
        return res.status(400).json({ message: 'The description field is required' }).end()
    }

    const field_slug = body.field.split(' ')[1].slice(1, -1)
    const field = await fields.findOneBy({ slug: field_slug })

    if (!field) {
        return res.status(400).json({ message: 'The field field is required' }).end()
    }

    const user_email = body.user.split(' ')[1].slice(1, -1)
    const user = await users.findOneBy({ email: user_email })

    if (!user) {
        return res.status(400).json({ message: 'The user field is required' }).end()
    }

    if (validator.is_empty(body.data)) {
        return res.status(400).json({ message: 'The data field is required' }).end()
    }

    return next()
}

export const get = async (req: Request, res: Response, next: NextFunction) => {
    const response = await responses.findOneBy({ slug: req.params.slug })

    if (!response) {
        return res.status(404).json({ message: 'Response not found' }).end()
    }

    return next()
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body as ResponseType

    if (validator.is_empty(body.name)) {
        return res.status(400).json({ message: 'The name field is required' }).end()
    }

    if (validator.is_empty(body.slug)) {
        return res.status(400).json({ message: 'The slug field is required' }).end()
    }

    const conflict = await responses.findOneBy({ slug: body.slug })

    if (conflict && conflict.slug !== req.params.slug) {
        return res.status(400).json({ message: 'Slug already exists' }).end()
    }

    if (validator.is_empty(body.description)) {
        return res.status(400).json({ message: 'The description field is required' }).end()
    }

    const field_slug = body.field.split(' ')[1].slice(1, -1)
    const field = await fields.findOneBy({ slug: field_slug })

    if (!field) {
        return res.status(400).json({ message: 'The field field is required' }).end()
    }

    const user_email = body.user.split(' ')[1].slice(1, -1)
    const user = await users.findOneBy({ email: user_email })

    if (!user) {
        return res.status(400).json({ message: 'The user field is required' }).end()
    }

    if (user.id !== req.payload!.user_id) {
        return res.status(401).json({ message: 'Unauthorized' }).end()
    }

    if (validator.is_empty(body.data)) {
        return res.status(400).json({ message: 'The data field is required' }).end()
    }

    return next()
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    const response = await responses.findOneBy({ slug: req.params.slug })

    if (!response) {
        return res.status(404).json({ message: 'Response not found' }).end()
    }

    if (response.user.id !== req.payload!.user_id) {
        return res.status(401).json({ message: 'Unauthorized' }).end()
    }

    return next()
}
