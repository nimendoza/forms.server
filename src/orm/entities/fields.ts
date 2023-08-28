import { BaseEntity, CreateDateColumn, Column, Entity, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm'

import type { Form } from 'orm/entities/forms'
import type { Response } from 'orm/entities/responses'

type args = {
    slug: string
    name: string
    description: string
    forms?: Form[]
    responses?: Response[]
}

@Entity('fields')
export class Field extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @CreateDateColumn({ name: 'created_at' })
    created_at!: Date

    @Column({ unique: true })
    slug!: string

    @Column()
    name!: string

    @Column()
    description!: string

    @ManyToMany('Form', (form: Form) => form.fields)
    forms!: Form[]

    @OneToMany('Response', (response: Response) => response.field)
    responses!: Response[]

    constructor(args?: args) {
        super()
        if (args) {
            this.slug = args.slug
            this.name = args.name
            this.description = args.description
            this.forms = args.forms || []
            this.responses = args.responses || []
        }
    }

    to_JSON(exclude: string[]=[]) {
        return {
            id: exclude.includes('id') ? undefined : this.id,
            slug: exclude.includes('slug') ? undefined : this.slug,
            name: exclude.includes('name') ? undefined : this.name,
            description: exclude.includes('description') ? undefined : this.description,
            forms: exclude.includes('forms') ? undefined : this.forms.map(form => `${form.name} (${form.slug})`),
            responses: exclude.includes('responses') ? undefined : this.responses.map(response => `${response.name} (${response.slug})`),
        }
    }
}
