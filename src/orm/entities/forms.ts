import { BaseEntity, CreateDateColumn, Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'

import type { Field } from 'orm/entities/fields'

type args = {
    slug: string
    name: string
    description: string
    fields?: Field[]
}

@Entity('forms')
export class Form extends BaseEntity {
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

    @ManyToMany('Field', (field: Field) => field.forms)
    @JoinTable({
        name: 'forms_fields',
        joinColumn: {
            name: 'form_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'field_id',
            referencedColumnName: 'id',
        },
    })
    fields!: Field[]

    constructor(args?: args) {
        super()
        if (args) {
            this.slug = args.slug
            this.name = args.name
            this.description = args.description
            this.fields = args.fields || []
        }
    }

    to_JSON(exclude: string[]=[]) {
        return {
            id: exclude.includes('id') ? undefined : this.id,
            slug: exclude.includes('slug') ? undefined : this.slug,
            name: exclude.includes('name') ? undefined : this.name,
            description: exclude.includes('description') ? undefined : this.description,
            fields: exclude.includes('fields') ? undefined : this.fields.map(field => `${field.name} (${field.slug})`),
        }
    }
}
