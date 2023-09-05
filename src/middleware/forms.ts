import { Request, Response, NextFunction } from 'express'

import { Form } from '@types'
import { forms, fields } from 'orm'
import { validator } from 'utils'

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body as Form

    if (validator.is_empty(body.name)) {
        return res.status(400).json({ message: 'The name field is required' }).end()
    }

    if (validator.is_empty(body.slug)) {
        return res.status(400).json({ message: 'The slug field is required' }).end()
    }

    const form = await forms.findOneBy({ slug: body.slug })

    if (form) {
        return res.status(400).json({ message: 'Slug already exists' }).end()
    }

    if (validator.is_empty(body.description)) {
        return res.status(400).json({ message: 'The description field is required' }).end()
    }

    if (!Array.isArray(body.fields)) {
        return res.status(400).json({ message: 'The fields field must be an array' }).end()
    }

    body.fields!.map(async (field) => {
        const slug = field.split(' ')[1].slice(1, -1)
        const field_object = await fields.findOneBy({ slug })

        if (!field_object) {
            return res.status(400).json({ message: 'Invalid field' }).end()
        }
    })

    return next()
}

export const get = async (req: Request, res: Response, next: NextFunction) => {
    const form = await forms.findOneBy({ slug: req.params.slug })

    if (!form) {
        return res.status(404).json({ message: 'Form not found' }).end()
    }

    return next()
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const form = await forms.findOneBy({ slug: req.params.slug })

    if (!form) {
        return res.status(404).json({ message: 'Form not found' }).end()
    }

    const body = req.body as Form

    if (validator.is_empty(body.name)) {
        return res.status(400).json({ message: 'The name field is required' }).end()
    }

    if (validator.is_empty(body.slug)) {
        return res.status(400).json({ message: 'The slug field is required' }).end()
    }

    if (body.slug !== req.params.slug) {
        const form = await forms.findOneBy({ slug: body.slug })

        if (form) {
            return res.status(400).json({ message: 'Slug already exists' }).end()
        }
    }

    if (validator.is_empty(body.description)) {
        return res.status(400).json({ message: 'The description field is required' }).end()
    }

    if (!Array.isArray(body.fields)) {
        return res.status(400).json({ message: 'The fields field must be an array' }).end()
    }

    body.fields!.map(async (field) => {
        const slug = field.split(' ')[1].slice(1, -1)
        const field_object = await fields.findOneBy({ slug })

        if (!field_object) {
            return res.status(400).json({ message: 'Invalid field' }).end()
        }
    })

    return next()
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    const form = await forms.findOneBy({ slug: req.params.slug })

    if (!form) {
        return res.status(404).json({ message: 'Form not found' }).end()
    }

    return next()
}
