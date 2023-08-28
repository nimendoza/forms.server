import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm'

import type { Privilege } from 'orm/entities/privileges'

type args = {
    slug: string
    name: string
    description: string
    privileges?: Privilege[]
}

@Entity('scopes')
export class Scope extends BaseEntity {
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

    @OneToMany('Privilege', (privilege: Privilege) => privilege.scope)
    privileges!: Privilege[]

    constructor(args?: args) {
        super()
        if (args) {
            this.slug = args.slug
            this.name = args.name
            this.description = args.description
            this.privileges = args.privileges || []
        }
    }

    to_JSON(exclude: string[]=[]) {
        return {
            id: exclude.includes('id') ? undefined : this.id,
            created_at: exclude.includes('created_at') ? undefined : this.created_at,
            slug: exclude.includes('slug') ? undefined : this.slug,
            name: exclude.includes('name') ? undefined : this.name,
            description: exclude.includes('description') ? undefined : this.description,
            privileges: exclude.includes('privileges') ? undefined : this.privileges.map(privilege => `${privilege.name} (${privilege.slug})`),
        }
    }
}
