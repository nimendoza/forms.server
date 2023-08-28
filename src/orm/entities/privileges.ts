import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, ManyToMany, JoinColumn, JoinTable } from 'typeorm'

import type { Group } from 'orm/entities/groups'
import type { Scope } from 'orm/entities/scopes'
import type { User } from 'orm/entities/users'

export enum privileges {
    NONE = 'NONE',
    EDIT = 'EDIT',
    READ = 'READ',
    CREATE = 'CREATE',
    DELETE = 'DELETE',
}

type args = {
    slug: string
    name: string
    description: string
    scope: Scope
    type?: privileges
    users?: User[]
    groups?: Group[]
}

@Entity('privileges')
export class Privilege extends BaseEntity {
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

    @Column({ type: 'enum', enum: privileges, default: privileges.NONE })
    type!: privileges

    @ManyToOne('Scope', (scope: Scope) => scope.privileges)
    @JoinColumn({ name: 'scope_id' })
    scope!: Scope

    @ManyToMany('User', (user: User) => user.privileges)
    users!: User[]

    @ManyToMany('Group', (group: Group) => group.privileges)
    @JoinTable({
        name: 'groups_privileges',
        joinColumn: {
            name: 'privilege_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'group_id',
            referencedColumnName: 'id',
        },
    })
    groups!: Group[]

    constructor(args?: args) {
        super()
        if (args) {
            this.slug = args.slug
            this.name = args.name
            this.description = args.description
            this.type = args.type || privileges.NONE
            this.scope = args.scope
            this.users = args.users || []
            this.groups = args.groups || []
        }
    }

    to_JSON(exclude: string[]=[]) {
        return {
            id: exclude.includes('id') ? undefined : this.id,
            created_at: exclude.includes('created_at') ? undefined : this.created_at,
            slug: exclude.includes('slug') ? undefined : this.slug,
            name: exclude.includes('name') ? undefined : this.name,
            description: exclude.includes('description') ? undefined : this.description,
            type: exclude.includes('type') ? undefined : this.type,
            scope: exclude.includes('scope') ? undefined : `${this.scope.name} (${this.scope.slug})`,
            users: exclude.includes('users') ? undefined : this.users.map(user => `${user.name} (${user.email})`),
            groups: exclude.includes('groups') ? undefined : this.groups.map(group => `${group.name} (${group.slug})`),
        }
    }
}
