import { Request, Response, NextFunction } from 'express'

import { Field } from '@types'
import { fields, forms, responses } from 'orm'
import { validator } from 'utils'

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body as Field

    if (validator.is_empty(body.name)) {
        return res.status(400).json({ message: 'The name field is required' }).end()
    }

    if (validator.is_empty(body.slug)) {
        return res.status(400).json({ message: 'The slug field is required' }).end()
    }

    const field = await fields.findOneBy({ slug: body.slug })

    if (field) {
        return res.status(400).json({ message: 'Slug already exists' }).end()
    }

    if (validator.is_empty(body.description)) {
        return res.status(400).json({ message: 'The description field is required' }).end()
    }

    if (!Array.isArray(body.forms)) {
        return res.status(400).json({ message: 'The forms field must be an array' }).end()
    }

    body.forms!.map(async (form) => {
        const slug = form.split(' ')[1].slice(1, -1)
        const form_object = await forms.findOneBy({ slug })

        if (!form_object) {
            return res.status(400).json({ message: 'Invalid form' }).end()
        }
    })

    if (!Array.isArray(body.responses)) {
        return res.status(400).json({ message: 'The responses field must be an array' }).end()
    }

    body.responses!.map(async (response) => {
        const slug = response.split(' ')[1].slice(1, -1)
        const response_object = await responses.findOneBy({ slug })

        if (!response_object) {
            return res.status(400).json({ message: 'Invalid response' }).end()
        }
    })

    return next()
}

export const get = async (req: Request, res: Response, next: NextFunction) => {
    const field = await fields.findOneBy({ slug: req.params.slug })

    if (!field) {
        return res.status(404).json({ message: 'Field not found' }).end()
    }

    return next()
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const field = await fields.findOneBy({ slug: req.params.slug })

    if (!field) {
        return res.status(404).json({ message: 'Field not found' }).end()
    }

    const body = req.body as Field

    if (validator.is_empty(body.name)) {
        return res.status(400).json({ message: 'The name field is required' }).end()
    }

    if (validator.is_empty(body.slug)) {
        return res.status(400).json({ message: 'The slug field is required' }).end()
    }

    const conflict = await fields.findOneBy({ slug: body.slug })

    if (conflict && conflict.slug !== req.params.slug) {
        return res.status(400).json({ message: 'Slug already exists' }).end()
    }

    if (validator.is_empty(body.description)) {
        return res.status(400).json({ message: 'The description field is required' }).end()
    }

    if (!Array.isArray(body.forms)) {
        return res.status(400).json({ message: 'The forms field must be an array' }).end()
    }

    body.forms!.map(async (form) => {
        const slug = form.split(' ')[1].slice(1, -1)
        const form_object = await forms.findOneBy({ slug })

        if (!form_object) {
            return res.status(400).json({ message: 'Invalid form' }).end()
        }
    })

    if (!Array.isArray(body.responses)) {
        return res.status(400).json({ message: 'The responses field must be an array' }).end()
    }

    body.responses!.map(async (response) => {
        const slug = response.split(' ')[1].slice(1, -1)
        const response_object = await responses.findOneBy({ slug })

        if (!response_object) {
            return res.status(400).json({ message: 'Invalid response' }).end()
        }
    })

    return next()
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    const field = await fields.findOneBy({ slug: req.params.slug })

    if (!field) {
        return res.status(404).json({ message: 'Field not found' }).end()
    }

    return next()
}
