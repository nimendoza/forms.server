import { Request, Response } from 'express'

import { Field } from '@types'
import { Field as FieldClass } from 'orm/entities/fields'
import { fields, forms, responses } from 'orm'
import { Form } from 'orm/entities/forms'
import { Response as ResponseType } from 'orm/entities/responses'

export const list = async (req: Request, res: Response) => {
    const field_list = await fields.find()

    return res.status(200).json(field_list.map((field) => field.to_JSON())).end()
}

export const create = async (req: Request, res: Response) => {
    const body = req.body as Field

    const form_list: Form[] = []
    body.forms!.map(async (form) => {
        const slug = form.split(' ')[1].slice(1, -1)
        const form_object = await forms.findOneBy({ slug })

        form_list.push(form_object!)
    })

    const response_list: ResponseType[] = []
    body.responses!.map(async (response) => {
        const slug = response.split(' ')[1].slice(1, -1)
        const response_object = await responses.findOneBy({ slug })

        response_list.push(response_object!)
    })

    const field = new FieldClass({
        name: body.name,
        slug: body.slug,
        description: body.description,
        forms: form_list,
        responses: response_list,
    })

    await field.save()

    return res.status(201).json(field.to_JSON()).end()
}

export const get = async (req: Request, res: Response) => {
    const field = await fields.findOneBy({ slug: req.params.slug })

    return res.status(200).json(field!.to_JSON()).end()
}

export const update = async (req: Request, res: Response) => {
    const body = req.body as Field

    const form_list: Form[] = []
    body.forms!.map(async (form) => {
        const slug = form.split(' ')[1].slice(1, -1)
        const form_object = await forms.findOneBy({ slug })

        form_list.push(form_object!)
    })

    const response_list: ResponseType[] = []
    body.responses!.map(async (response) => {
        const slug = response.split(' ')[1].slice(1, -1)
        const response_object = await responses.findOneBy({ slug })

        response_list.push(response_object!)
    })

    const form = await fields.findOneBy({ slug: req.params.slug })

    form!.name = body.name
    form!.slug = body.slug
    form!.description = body.description
    form!.forms = form_list
    form!.responses = response_list

    await form!.save()

    return res.status(200).json(form!.to_JSON()).end()
}

export const remove = async (req: Request, res: Response) => {
    const form = await fields.findOneBy({ slug: req.params.slug })

    await form!.remove()

    return res.status(204).end()
}

export const access = async (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Access granted' }).end()
}
