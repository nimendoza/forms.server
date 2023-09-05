import { Request, Response, NextFunction } from 'express'

import { Group } from '@types'
import { groups, users, privileges } from 'orm'
import { validator } from 'utils'

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body as Group

    if (validator.is_empty(body.name)) {
        return res.status(400).json({ message: 'The name field is required' }).end()
    }

    if (validator.is_empty(body.slug)) {
        return res.status(400).json({ message: 'The slug field is required' }).end()
    }

    const group = await groups.findOneBy({ slug: body.slug })

    if (group) {
        return res.status(400).json({ message: 'Slug already exists' }).end()
    }

    if (validator.is_empty(body.description)) {
        return res.status(400).json({ message: 'The description field is required' }).end()
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
    const group = await groups.findOneBy({ slug: req.params.slug })

    if (!group) {
        return res.status(404).json({ message: 'Group not found' }).end()
    }

    return next()
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const group = await groups.findOneBy({ slug: req.params.slug })

    if (!group) {
        return res.status(404).json({ message: 'Group not found' }).end()
    }

    const body = req.body as Group

    if (validator.is_empty(body.name)) {
        return res.status(400).json({ message: 'The name field is required' }).end()
    }

    if (validator.is_empty(body.slug)) {
        return res.status(400).json({ message: 'The slug field is required' }).end()
    }

    if (body.slug !== req.params.slug) {
        const group = await groups.findOneBy({ slug: body.slug })

        if (group) {
            return res.status(400).json({ message: 'Slug already exists' }).end()
        }
    }

    if (validator.is_empty(body.description)) {
        return res.status(400).json({ message: 'The description field is required' }).end()
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

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    const group = await groups.findOneBy({ slug: req.params.slug })

    if (!group) {
        return res.status(404).json({ message: 'Group not found' }).end()
    }

    return next()
}
