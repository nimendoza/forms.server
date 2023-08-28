import { BaseEntity, CreateDateColumn, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'

import type { Field } from 'orm/entities/fields'
import type { User } from 'orm/entities/users'

import { json } from 'utils'

type args = {
    slug: string
    name: string
    description: string
    data: json
    field: Field
    user: User
}

@Entity('responses')
export class Response extends BaseEntity {
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

    @Column({ type: 'jsonb' })
    data!: json

    @ManyToOne('Field', (field: Field) => field.responses)
    @JoinColumn({ name: 'field_id' })
    field!: Field

    @ManyToOne('User', (user: User) => user.responses)
    @JoinColumn({ name: 'user_id' })
    user!: User

    constructor(args?: args) {
        super()
        if (args) {
            this.slug = args.slug
            this.name = args.name
            this.description = args.description
            this.data = args.data
            this.field = args.field
            this.user = args.user
        }
    }

    to_JSON(exclude: string[]=[]) {
        return {
            id: exclude.includes('id') ? undefined : this.id,
            created_at: exclude.includes('created_at') ? undefined : this.created_at,
            slug: exclude.includes('slug') ? undefined : this.slug,
            name: exclude.includes('name') ? undefined : this.name,
            description: exclude.includes('description') ? undefined : this.description,
            data: exclude.includes('data') ? undefined : this.data,
            field: exclude.includes('field') ? undefined : `${this.field.name} (${this.field.slug})`,
            user: exclude.includes('user') ? undefined : `${this.user.name} (${this.user.email})`,
        }
    }
}
