import { Request, Response } from 'express'

import { Group } from '@types'
import { User } from 'orm/entities/users'
import { Privilege } from 'orm/entities/privileges'
import { Group as GroupClass } from 'orm/entities/groups'
import { groups, privileges, users } from 'orm'

export const list = async (req: Request, res: Response) => {
    const group_list = await groups.find()

    return res.status(200).json(group_list.map(group => group.to_JSON())).end()
}

export const create = async (req: Request, res: Response) => {
    const body = req.body as Group

    const user_list: User[] = []
    body.users!.map(async (user) => {
        const email = user.split(' ')[1].slice(1, -1)
        const user_object = await users.findOneBy({ email })

        user_list.push(user_object!)
    })

    const privilege_list: Privilege[] = []
    body.privileges!.map(async (privilege) => {
        const slug = privilege.split(' ')[1].slice(1, -1)
        const privilege_object = await privileges.findOneBy({ slug })

        privilege_list.push(privilege_object!)
    })

    const group = new GroupClass({
        name: body.name,
        slug: body.slug,
        description: body.description,
        users: user_list,
        privileges: privilege_list,
    })

    await group.save()

    return res.status(201).json(group.to_JSON()).end()
}

export const get = async (req: Request, res: Response) => {
    const group = await groups.findOneBy({ slug: req.params.slug })

    return res.status(200).json(group!.to_JSON()).end()
}

export const update = async (req: Request, res: Response) => {
    const body = req.body as Group

    const user_list: User[] = []
    body.users!.map(async (user) => {
        const email = user.split(' ')[1].slice(1, -1)
        const user_object = await users.findOneBy({ email })

        user_list.push(user_object!)
    })

    const privilege_list: Privilege[] = []
    body.privileges!.map(async (privilege) => {
        const slug = privilege.split(' ')[1].slice(1, -1)
        const privilege_object = await privileges.findOneBy({ slug })

        privilege_list.push(privilege_object!)
    })

    const group = await groups.findOneBy({ slug: req.params.slug })

    group!.name = body.name
    group!.slug = body.slug
    group!.description = body.description
    group!.users = user_list
    group!.privileges = privilege_list

    await group!.save()

    return res.status(200).json(group!.to_JSON()).end()
}

export const remove = async (req: Request, res: Response) => {
    const group = await groups.findOneBy({ slug: req.params.slug })

    await group!.remove()

    return res.status(200).json({ message: 'Group successfully removed' }).end()
}
