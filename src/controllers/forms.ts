import { Request, Response } from 'express'

import { Form } from '@types'
import { Form as FormClass } from 'orm/entities/forms'
import { forms, fields } from 'orm'
import { Field } from 'orm/entities/fields'

export const list = async (req: Request, res: Response) => {
    const form_list = await forms.find()

    return res.status(200).json(form_list.map((form) => form.to_JSON())).end()
}

export const create = async (req: Request, res: Response) => {
    const body = req.body as Form

    const field_list: Field[] = []
    body.fields!.map(async (field) => {
        const slug = field.split(' ')[1].slice(1, -1)
        const field_object = await fields.findOneBy({ slug })

        field_list.push(field_object!)
    })

    const form = new FormClass({
        name: body.name,
        slug: body.slug,
        description: body.description,
        fields: field_list,
    })

    await form.save()

    return res.status(201).json(form.to_JSON()).end()
}

export const get = async (req: Request, res: Response) => {
    const form = await forms.findOneBy({ slug: req.params.slug })

    return res.status(200).json(form!.to_JSON()).end()
}

export const update = async (req: Request, res: Response) => {
    const body = req.body as Form

    const field_list: Field[] = []
    body.fields!.map(async (field) => {
        const slug = field.split(' ')[1].slice(1, -1)
        const field_object = await fields.findOneBy({ slug })

        field_list.push(field_object!)
    })

    const form = await forms.findOneBy({ slug: req.params.slug })

    form!.name = body.name
    form!.slug = body.slug
    form!.description = body.description
    form!.fields = field_list

    await form!.save()

    return res.status(200).json(form!.to_JSON()).end()
}

export const remove = async (req: Request, res: Response) => {
    const form = await forms.findOneBy({ slug: req.params.slug })

    await form!.remove()

    return res.status(204).end()
}
