import { Request, Response } from 'express'

import { Privilege } from '@types'
import { Privilege as PrivilegeClass } from 'orm/entities/privileges'
import { privileges, users, groups, scopes } from 'orm'
import { User } from 'orm/entities/users'
import { Group } from 'orm/entities/groups'

export const create = async (req: Request, res: Response) => {
    const body = req.body as Privilege

    const user_list: User[] = []
    body.users!.map(async (user) => {
        const email = user.split(' ')[1].slice(1, -1)
        const user_object = await users.findOneBy({ email })

        user_list.push(user_object!)
    })

    const group_list: Group[] = []
    body.groups!.map(async (group) => {
        const slug = group.split(' ')[1].slice(1, -1)
        const group_object = await groups.findOneBy({ slug })

        group_list.push(group_object!)
    })

    const scope_slug = body.scope.split('.')[1].slice(1, -1)
    const scope = await scopes.findOneBy({ slug: scope_slug })

    if (!scope) {
        return res.status(400).json({ message: 'Invalid scope' }).end()
    }

    const privilege = new PrivilegeClass({
        name: body.name,
        slug: body.slug,
        description: body.description,
        type: body.type,
        users: user_list,
        groups: group_list,
        scope: scope,
    })

    await privilege.save()

    return res.status(201).json(privilege.to_JSON()).end()
}

export const list = async (req: Request, res: Response) => {
    const privilege_list = await privileges.find()

    return res.status(200).json(privilege_list.map((privilege) => privilege.to_JSON())).end()
}

export const get = async (req: Request, res: Response) => {
    const privilege = await privileges.findOneBy({ slug: req.params.slug })

    return res.status(200).json(privilege!.to_JSON()).end()
}

export const update = async (req: Request, res: Response) => {
    const body = req.body as Privilege

    const user_list: User[] = []
    body.users!.map(async (user) => {
        const email = user.split(' ')[1].slice(1, -1)
        const user_object = await users.findOneBy({ email })

        user_list.push(user_object!)
    })

    const group_list: Group[] = []
    body.groups!.map(async (group) => {
        const slug = group.split(' ')[1].slice(1, -1)
        const group_object = await groups.findOneBy({ slug })

        group_list.push(group_object!)
    })

    const scope_slug = body.scope.split('.')[1].slice(1, -1)
    const scope = await scopes.findOneBy({ slug: scope_slug })

    if (!scope) {
        return res.status(400).json({ message: 'Invalid scope' }).end()
    }

    const privilege = await privileges.findOneBy({ slug: req.params.slug })

    privilege!.name = body.name
    privilege!.slug = body.slug
    privilege!.description = body.description
    privilege!.type = body.type
    privilege!.users = user_list
    privilege!.groups = group_list
    privilege!.scope = scope

    await privilege!.save()

    return res.status(200).json(privilege!.to_JSON()).end()
}

export const remove = async (req: Request, res: Response) => {
    const privilege = await privileges.findOneBy({ slug: req.params.slug })

    await privilege!.remove()

    return res.status(204).end()
}
