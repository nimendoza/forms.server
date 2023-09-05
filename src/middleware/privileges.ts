import { Request, Response, NextFunction } from 'express'

import { Privilege } from '@types'
import { privileges, users, groups, scopes } from 'orm'
import { validator } from 'utils'

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body as Privilege

    if (validator.is_empty(body.name)) {
        return res.status(400).json({ message: 'The name field is required' }).end()
    }

    if (validator.is_empty(body.slug)) {
        return res.status(400).json({ message: 'The slug field is required' }).end()
    }

    const scope_slug = body.scope.split('.')[1].slice(1, -1)
    const scope = await scopes.findOneBy({ slug: scope_slug })

    if (!scope) {
        return res.status(400).json({ message: 'Invalid scope' }).end()
    }

    const privilege = await privileges.findOneBy({ slug: body.slug })

    if (privilege) {
        return res.status(400).json({ message: 'Slug already exists' }).end()
    }

    if (validator.is_empty(body.description)) {
        return res.status(400).json({ message: 'The description field is required' }).end()
    }

    if (!Object.keys(privileges).includes(body.type)) {
        return res.status(400).json({ message: 'Invalid type' }).end()
    }

    if (!Array.isArray(body.users)) {
        return res.status(400).json({ message: 'The users field must be an array' }).end()
    }

    body.users!.map(async (user) => {
        const email = user.split(' ')[1].slice(1, -1)
        const user_object = await users.findOneBy({ email })

        if (!user_object) {
            return res.status(400).json({ message: 'Invalid user' }).end()
        }
    })

    if (!Array.isArray(body.groups)) {
        return res.status(400).json({ message: 'The groups field must be an array' }).end()
    }

    body.groups!.map(async (group) => {
        const slug = group.split(' ')[1].slice(1, -1)
        const group_object = await groups.findOneBy({ slug })

        if (!group_object) {
            return res.status(400).json({ message: 'Invalid group' }).end()
        }
    })

    return next()
}

export const get = async (req: Request, res: Response, next: NextFunction) => {
    const privilege = await privileges.findOneBy({ slug: req.params.slug })

    if (!privilege) {
        return res.status(404).json({ message: 'Privilege not found' }).end()
    }

    return next()
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const privilege = await privileges.findOneBy({ slug: req.params.slug })

    if (!privilege) {
        return res.status(404).json({ message: 'Privilege not found' }).end()
    }

    const body = req.body as Privilege

    if (validator.is_empty(body.name)) {
        return res.status(400).json({ message: 'The name field is required' }).end()
    }

    if (validator.is_empty(body.slug)) {
        return res.status(400).json({ message: 'The slug field is required' }).end()
    }

    const scope_slug = body.scope.split('.')[1].slice(1, -1)
    const scope = await scopes.findOneBy({ slug: scope_slug })

    if (!scope) {
        return res.status(400).json({ message: 'Invalid scope' }).end()
    }

    const conflict = await privileges.findOneBy({ slug: body.slug })

    if (conflict && body.slug !== req.params.slug) {
        return res.status(400).json({ message: 'Slug already exists' }).end()
    }

    if (validator.is_empty(body.description)) {
        return res.status(400).json({ message: 'The description field is required' }).end()
    }

    if (!Object.keys(privileges).includes(body.type)) {
        return res.status(400).json({ message: 'Invalid type' }).end()
    }

    if (!Array.isArray(body.users)) {
        return res.status(400).json({ message: 'The users field must be an array' }).end()
    }

    body.users!.map(async (user) => {
        const email = user.split(' ')[1].slice(1, -1)
        const user_object = await users.findOneBy({ email })

        if (!user_object) {
            return res.status(400).json({ message: 'Invalid user' }).end()
        }
    })

    if (!Array.isArray(body.groups)) {
        return res.status(400).json({ message: 'The groups field must be an array' }).end()
    }

    body.groups!.map(async (group) => {
        const slug = group.split(' ')[1].slice(1, -1)
        const group_object = await groups.findOneBy({ slug })

        if (!group_object) {
            return res.status(400).json({ message: 'Invalid group' }).end()
        }
    })

    return next()
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    const privilege = await privileges.findOneBy({ slug: req.params.slug })

    if (!privilege) {
        return res.status(404).json({ message: 'Privilege not found' }).end()
    }

    return next()
}
