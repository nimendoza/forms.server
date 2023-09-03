import { Request, Response, NextFunction } from 'express'

import { User } from '@types'
import { users, privileges as privilege_data, groups, responses } from 'orm'
import { privileges } from 'orm/entities/privileges'
import { validator } from 'utils'

export const add_info = (requires: privileges, scope: Set<string>, param: string='') => {
    return (req: Request, res: Response, next: NextFunction) => {
        Object.values(req.params).map((value) => scope.add(value))

        req.requires = requires
        req.scope = scope
        next()
    }
}

export const check = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.requires) {
        return next()
    }
    
    if (!req.scope) {
        return res.status(401).json({ message: 'Unauthorized' }).end()
    }
    
    if (!req.payload || Object.keys(req.payload).length === 0) {
        return res.status(401).json({ message: 'Unauthorized' }).end()
    }

    const user = await users.findOneBy({ id: req.payload.user_id })

    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' }).end()
    }

    const privileges = user.privileges.map((privilege) => privilege.slug)
    user.groups.map((group) => group.privileges.map((privilege) => privileges.push(privilege.slug)))

    for (const privilege of req.requires) {
        if (privileges.includes(privilege)) {
            return next()
        }
    }

    return res.status(401).json({ message: 'Unauthorized' }).end()
}

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body as User

    if (!validator.is_email(body.email)) {
        return res.status(400).json({ message: 'A valid email is required' }).end()
    }

    const user = await users.findOneBy({ email: body.email })

    if (user) {
        return res.status(400).json({ message: 'Email already exists' }).end()
    }

    if (validator.is_empty(body.name)) {
        return res.status(400).json({ message: 'The name field is required' }).end()
    }

    if (validator.is_empty(body.password)) {
        return res.status(400).json({ message: 'The password field is required' }).end()
    }

    if (!Array.isArray(body.privileges)) {
        return res.status(400).json({ message: 'The privileges field must be an array' }).end()
    }

    body.privileges!.map(async (privilege) => {
        const slug = privilege.split(' ')[1].slice(1, -1)
        const privilege_object = await privilege_data.findOneBy({ slug })

        if (!privilege_object) {
            return res.status(400).json({ message: 'Invalid privilege' }).end()
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
    if (!validator.is_email(req.params.email)) {
        return res.status(400).json({ message: 'A valid email is required' }).end()
    }

    const user = await users.findOneBy({ email: req.params.email })

    if (!user) {
        return res.status(404).json({ message: 'User not found' }).end()
    }

    return next()
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    if (!validator.is_email(req.params.email)) {
        return res.status(400).json({ message: 'A valid email is required' }).end()
    }

    if (!req.payload || Object.keys(req.payload).length === 0) {
        return res.status(401).json({ message: 'Unauthorized' }).end()
    }

    const user = await users.findOneBy({ email: req.params.email })

    if (!user) {
        return res.status(404).json({ message: 'User not found' }).end()
    }

    if (req.payload.user_id !== user.id) {
        return res.status(401).json({ message: 'Unauthorized' }).end()
    }

    if (!validator.is_email(req.body.email)) {
        return res.status(400).json({ message: 'A valid email is required' }).end()
    }

    const conflict = await users.findOneBy({ email: req.body.email })

    if (conflict && conflict.id !== user.id) {
        return res.status(400).json({ message: 'Email already exists' }).end()
    }

    if (validator.is_empty(req.body.name)) {
        return res.status(400).json({ message: 'The name field is required' }).end()
    }

    if (validator.is_empty(req.body.password)) {
        return res.status(400).json({ message: 'The password field is required' }).end()
    }

    if (!Array.isArray(req.body.privileges)) {
        return res.status(400).json({ message: 'The privileges field must be an array' }).end()
    }

    if (!Array.isArray(req.body.groups)) {
        return res.status(400).json({ message: 'The groups field must be an array' }).end()
    }

    if (!Array.isArray(req.body.responses)) {
        return res.status(400).json({ message: 'The responses field must be an array' }).end()
    }

    return next()
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    if (!validator.is_email(req.params.email)) {
        return res.status(400).json({ message: 'A valid email is required' }).end()
    }

    if (!req.payload || Object.keys(req.payload).length === 0) {
        return res.status(401).json({ message: 'Unauthorized' }).end()
    }

    const user = await users.findOneBy({ email: req.params.email })

    if (!user) {
        return res.status(404).json({ message: 'User not found' }).end()
    }

    if (req.payload.user_id !== user.id) {
        return res.status(401).json({ message: 'Unauthorized' }).end()
    }

    return next()
}

export const enable = async (req: Request, res: Response, next: NextFunction) => {
    if (!validator.is_email(req.params.email)) {
        return res.status(400).json({ message: 'A valid email is required' }).end()
    }

    if (!req.payload || Object.keys(req.payload).length === 0) {
        return res.status(401).json({ message: 'Unauthorized' }).end()
    }

    const user = await users.findOneBy({ email: req.params.email })

    if (!user) {
        return res.status(404).json({ message: 'User not found' }).end()
    }

    if (req.payload.user_id !== user.id) {
        return res.status(401).json({ message: 'Unauthorized' }).end()
    }

    return next()
}
