import { Request, Response } from 'express'

import { Scope } from '@types'
import { Scope as ScopeClass } from 'orm/entities/scopes'
import { scopes, privileges } from 'orm'
import { Privilege } from 'orm/entities/privileges'

export const create = async (req: Request, res: Response) => {
    const body = req.body as Scope

    const privilege_list: Privilege[] = []
    body.privileges!.map(async (privilege) => {
        const slug = privilege.split(' ')[1].slice(1, -1)
        const privilege_object = await privileges.findOneBy({ slug })

        privilege_list.push(privilege_object!)
    })

    const scope = new ScopeClass({
        name: body.name,
        slug: body.slug,
        description: body.description,
        privileges: privilege_list,
    })

    await scope.save()

    return res.status(201).json(scope.to_JSON()).end()
}

export const list = async (req: Request, res: Response) => {
    const scope_list = await scopes.find()

    return res.status(200).json(scope_list.map((scope) => scope.to_JSON())).end()
}

export const get = async (req: Request, res: Response) => {
    const scope = await scopes.findOneBy({ slug: req.params.slug })

    return res.status(200).json(scope!.to_JSON()).end()
}

export const update = async (req: Request, res: Response) => {
    const body = req.body as Scope

    const privilege_list: Privilege[] = []
    body.privileges!.map(async (privilege) => {
        const slug = privilege.split(' ')[1].slice(1, -1)
        const privilege_object = await privileges.findOneBy({ slug })

        privilege_list.push(privilege_object!)
    })

    const scope = await scopes.findOneBy({ slug: req.params.slug })
    scope!.name = body.name
    scope!.slug = body.slug
    scope!.description = body.description
    scope!.privileges = privilege_list

    await scope!.save()

    return res.status(200).json(scope!.to_JSON()).end()
}

export const remove = async (req: Request, res: Response) => {
    const scope = await scopes.findOneBy({ slug: req.params.slug })

    await scope!.remove()

    return res.status(200).json(scope!.to_JSON()).end()
}
