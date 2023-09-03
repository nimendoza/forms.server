import bcrypt from 'bcryptjs'

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, OneToMany, JoinTable } from 'typeorm'

import type { Response } from 'orm/entities/responses'
import type { Group } from 'orm/entities/groups'
import type { Privilege } from 'orm/entities/privileges'

export enum state {
    enabled = 'ENABLED',
    disabled = 'DISABLED',
}

type args = {
    email: string
    password: string
    name: string
    groups?: Group[]
    privileges?: Privilege[]
    responses?: Response[]
    state?: state
}

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @CreateDateColumn({ name: 'created_at' })
    created_at!: Date

    @Column({ unique: true })
    email!: string

    @Column()
    name!: string

    @Column({ name: 'hashed_password' })
    private _hashed_password!: string

    @Column({ type: 'enum', enum: state, default: state.disabled })
    state!: state

    @ManyToMany('Group', (group: Group) => group.users)
    @JoinTable({
        name: 'users_groups',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'group_id',
            referencedColumnName: 'id',
        },
    })
    groups!: Group[]

    @ManyToMany('Privilege', (privilege: Privilege) => privilege.users)
    @JoinTable({
        name: 'users_privileges',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'privilege_id',
            referencedColumnName: 'id',
        },
    })
    privileges!: Privilege[]

    @OneToMany('Response', (response: Response) => response.user)
    responses!: Response[]

    constructor(args?: args) {
        super()
        if (args) {
            this.email = args.email
            this.name = args.name
            this._hashed_password = bcrypt.hashSync(args.password, 10)
            this.groups = args.groups || []
            this.privileges = args.privileges || []
            this.responses = args.responses || []
            this.state = args.state || state.disabled
        }
    }

    get hashed_password(): string {
        return this._hashed_password
    }

    set hashed_password(password: string) {
        this._hashed_password = bcrypt.hashSync(password, 10)
    }

    check_password(password: string): boolean {
        return bcrypt.compareSync(password, this.hashed_password)
    }

    to_JSON(exclude: string[]=[]): Record<string, unknown> {
        return {
            id: exclude.includes('id') ? undefined : this.id,
            created_at: exclude.includes('created_at') ? undefined : this.created_at,
            email: exclude.includes('email') ? undefined: this.email,
            name: exclude.includes('name') ? undefined : this.name,
            groups: exclude.includes('groups') ? undefined : this.groups.map((group: Group) => `${group.name} (${group.slug})`),
            privileges: exclude.includes('privileges') ? undefined : this.privileges.map((privilege: Privilege) => `${privilege.name} (${privilege.slug})`),
            responses: exclude.includes('responses') ? undefined : this.responses.map((response: Response) => `${response.name} (${response.slug})`),
            state: exclude.includes('state') ? undefined : this.state,
        }
    }
}
