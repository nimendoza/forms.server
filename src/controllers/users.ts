import { Request, Response } from 'express'

import { User } from '@types'
import { User as UserClass, state } from 'orm/entities/users'
import { Group } from 'orm/entities/groups'
import { Privilege } from 'orm/entities/privileges'
import { Response as ResponseClass } from 'orm/entities/responses'
import { users, privileges, groups, responses } from 'orm'

export const list = async (req: Request, res: Response) => {
    const user_list = await users.find()

    return res.status(200).json(user_list.map((user) => user.to_JSON())).end()
}

export const create = async (req: Request, res: Response) => {
    const body = req.body as User

    const group_list: Group[] = []
    body.groups!.map(async (group) => {
        const slug = group.split(' ')[1].slice(1, -1)
        const group_object = await groups.findOneBy({ slug })

        group_list.push(group_object!)
    })

    const privilege_list: Privilege[] = []
    body.privileges!.map(async (privilege) => {
        const slug = privilege.split(' ')[1].slice(1, -1)
        const privilege_object = await privileges.findOneBy({ slug })

        privilege_list.push(privilege_object!)
    })

    const response_list: ResponseClass[] = []
    body.responses!.map(async (response) => {
        const slug = response.split(' ')[1].slice(1, -1)
        const response_object = await responses.findOneBy({ slug })
        
        response_list.push(response_object!)
    })

    const user = new UserClass({
        email: body.email,
        name: body.name,
        password: body.password,
        groups: group_list,
        privileges: privilege_list,
        responses: response_list,
    })

    await user.save()

    return res.status(201).json(user.to_JSON()).end()
}

export const get = async (req: Request, res: Response) => {
    const user = await users.findOneBy({ email: req.params.email })

    return res.status(200).json(user!.to_JSON()).end()
}

export const update = async (req: Request, res: Response) => {
    const body = req.body as User

    const group_list: Group[] = []
    body.groups!.map(async (group) => {
        const slug = group.split(' ')[1].slice(1, -1)
        const group_object = await groups.findOneBy({ slug })

        group_list.push(group_object!)
    })

    const privilege_list: Privilege[] = []
    body.privileges!.map(async (privilege) => {
        const slug = privilege.split(' ')[1].slice(1, -1)
        const privilege_object = await privileges.findOneBy({ slug })

        privilege_list.push(privilege_object!)
    })

    const response_list: ResponseClass[] = []
    body.responses!.map(async (response) => {
        const slug = response.split(' ')[1].slice(1, -1)
        const response_object = await responses.findOneBy({ slug })

        response_list.push(response_object!)
    })

    const user = await users.findOneBy({ email: req.params.email })

    user!.email = body.email
    user!.name = body.name
    user!.hashed_password = body.password
    user!.groups = group_list
    user!.privileges = privilege_list
    user!.responses = response_list

    await user!.save()

    return res.status(200).json(user!.to_JSON()).end()
}

export const remove = async (req: Request, res: Response) => {
    const user = await users.findOneBy({ email: req.params.email })

    await user!.remove()

    return res.status(204).end()
}

export const enable = async (req: Request, res: Response) => {
    const user = await users.findOneBy({ email: req.params.email })

    user!.state = state.enabled

    await user!.save()

    return res.status(200).json(user!.to_JSON()).end()
}

export const access = async (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Access granted' }).end()
}
