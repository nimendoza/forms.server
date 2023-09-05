import { Request, Response, NextFunction } from 'express'

import { Scope } from '@types'
import { scopes, privileges } from 'orm'
import { validator } from 'utils'

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body as Scope

    if (validator.is_empty(body.name)) {
        return res.status(400).json({ message: 'The name field is required' }).end()
    }

    if (validator.is_empty(body.slug)) {
        return res.status(400).json({ message: 'The slug field is required' }).end()
    }

    const scope = await scopes.findOneBy({ slug: body.slug })

    if (scope) {
        return res.status(400).json({ message: 'Slug already exists' }).end()
    }

    if (validator.is_empty(body.description)) {
        return res.status(400).json({ message: 'The description field is required' }).end()
    }

    if (!Array.isArray(body.privileges)) {
        return res.status(400).json({ message: 'The privileges field must be an array' }).end()
    }

    body.privileges!.map(async (privilege) => {
        const slug = privilege.split(' ')[1].slice(1, -1)
        const privilege_object = await privileges.findOneBy({ slug })

        if (!privilege_object) {
            return res.status(400).json({ message: 'Invalid privilege' }).end()
        }
    })
        
    return next()
}

export const get = async (req: Request, res: Response, next: NextFunction) => {
    const scope = await scopes.findOneBy({ slug: req.params.slug })

    if (!scope) {
        return res.status(404).json({ message: 'Scope not found' }).end()
    }

    return next()
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body as Scope

    if (validator.is_empty(body.name)) {
        return res.status(400).json({ message: 'The name field is required' }).end()
    }

    if (validator.is_empty(body.description)) {
        return res.status(400).json({ message: 'The description field is required' }).end()
    }

    if (!Array.isArray(body.privileges)) {
        return res.status(400).json({ message: 'The privileges field must be an array' }).end()
    }

    body.privileges!.map(async (privilege) => {
        const slug = privilege.split(' ')[1].slice(1, -1)
        const privilege_object = await privileges.findOneBy({ slug })

        if (!privilege_object) {
            return res.status(400).json({ message: 'Invalid privilege' }).end()
        }
    })

    const conflict = await scopes.findOneBy({ slug: body.slug })

    if (conflict && conflict.slug !== req.params.slug) {
        return res.status(400).json({ message: 'Slug already exists' }).end()
    }

    return next()
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    const scope = await scopes.findOneBy({ slug: req.params.slug })

    if (!scope) {
        return res.status(404).json({ message: 'Scope not found' }).end()
    }

    return next()
}
