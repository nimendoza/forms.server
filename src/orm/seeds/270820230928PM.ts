import { data_source } from 'orm'
import { Scope } from 'orm/entities/scopes'
import { Privilege, privileges as privilege_enum } from 'orm/entities/privileges'
import { Group } from 'orm/entities/groups'
import { User } from 'orm/entities/users'

const seeder = async () => {
    await data_source.initialize()

    const group = new Group({
        slug: 'admin',
        name: 'Administrator',
        description: 'Administrator group',
    })

    const user_scope = new Scope({
        slug: 'user',
        name: 'User',
        description: 'User scope',
    })

    const user_edit_privilege = new Privilege({
        slug: 'user-edit',
        name: 'User edit',
        description: 'User edit privilege',
        scope: user_scope,
        type: privilege_enum.EDIT,
    })

    const user_read_privilege = new Privilege({
        slug: 'user-read',
        name: 'User read',
        description: 'User read privilege',
        scope: user_scope,
        type: privilege_enum.READ,
    })

    const user_create_privilege = new Privilege({
        slug: 'user-create',
        name: 'User create',
        description: 'User create privilege',
        scope: user_scope,
        type: privilege_enum.CREATE,
    })

    const user_delete_privilege = new Privilege({
        slug: 'user-delete',
        name: 'User delete',
        description: 'User delete privilege',
        scope: user_scope,
        type: privilege_enum.DELETE,
    })

    const user_privileges = [
        user_edit_privilege,
        user_read_privilege,
        user_create_privilege,
        user_delete_privilege,
    ]

    const scope_scope = new Scope({
        slug: 'scope',
        name: 'Scope',
        description: 'Scope scope',
    })

    const scope_edit_privilege = new Privilege({
        slug: 'scope-edit',
        name: 'Scope edit',
        description: 'Scope edit privilege',
        scope: scope_scope,
        type: privilege_enum.EDIT,
    })

    const scope_read_privilege = new Privilege({
        slug: 'scope-read',
        name: 'Scope read',
        description: 'Scope read privilege',
        scope: scope_scope,
        type: privilege_enum.READ,
    })

    const scope_create_privilege = new Privilege({
        slug: 'scope-create',
        name: 'Scope create',
        description: 'Scope create privilege',
        scope: scope_scope,
        type: privilege_enum.CREATE,
    })

    const scope_delete_privilege = new Privilege({
        slug: 'scope-delete',
        name: 'Scope delete',
        description: 'Scope delete privilege',
        scope: scope_scope,
        type: privilege_enum.DELETE,
    })

    const scope_privileges = [
        scope_edit_privilege,
        scope_read_privilege,
        scope_create_privilege,
        scope_delete_privilege,
    ]

    const response_scope = new Scope({
        slug: 'response',
        name: 'Response',
        description: 'Response scope',
    })

    const response_edit_privilege = new Privilege({
        slug: 'response-edit',
        name: 'Response edit',
        description: 'Response edit privilege',
        scope: response_scope,
        type: privilege_enum.EDIT,
    })

    const response_read_privilege = new Privilege({
        slug: 'response-read',
        name: 'Response read',
        description: 'Response read privilege',
        scope: response_scope,
        type: privilege_enum.READ,
    })

    const response_create_privilege = new Privilege({
        slug: 'response-create',
        name: 'Response create',
        description: 'Response create privilege',
        scope: response_scope,
        type: privilege_enum.CREATE,
    })

    const response_delete_privilege = new Privilege({
        slug: 'response-delete',
        name: 'Response delete',
        description: 'Response delete privilege',
        scope: response_scope,
        type: privilege_enum.DELETE,
    })

    const response_privileges = [
        response_edit_privilege,
        response_read_privilege,
        response_create_privilege,
        response_delete_privilege,
    ]
    
    const form_scope = new Scope({
        slug: 'form',
        name: 'Form',
        description: 'Form scope',
    })

    const form_edit_privilege = new Privilege({
        slug: 'form-edit',
        name: 'Form edit',
        description: 'Form edit privilege',
        scope: form_scope,
        type: privilege_enum.EDIT,
    })

    const form_read_privilege = new Privilege({
        slug: 'form-read',
        name: 'Form read',
        description: 'Form read privilege',
        scope: form_scope,
        type: privilege_enum.READ,
    })

    const form_create_privilege = new Privilege({
        slug: 'form-create',
        name: 'Form create',
        description: 'Form create privilege',
        scope: form_scope,
        type: privilege_enum.CREATE,
    })

    const form_delete_privilege = new Privilege({
        slug: 'form-delete',
        name: 'Form delete',
        description: 'Form delete privilege',
        scope: form_scope,
        type: privilege_enum.DELETE,
    })

    const form_privileges = [
        form_edit_privilege,
        form_read_privilege,
        form_create_privilege,
        form_delete_privilege,
    ]

    const field_scope = new Scope({
        slug: 'field',
        name: 'Field',
        description: 'Field scope',
    })

    const field_edit_privilege = new Privilege({
        slug: 'field-edit',
        name: 'Field edit',
        description: 'Field edit privilege',
        scope: field_scope,
        type: privilege_enum.EDIT,
    })

    const field_read_privilege = new Privilege({
        slug: 'field-read',
        name: 'Field read',
        description: 'Field read privilege',
        scope: field_scope,
        type: privilege_enum.READ,
    })

    const field_create_privilege = new Privilege({
        slug: 'field-create',
        name: 'Field create',
        description: 'Field create privilege',
        scope: field_scope,
        type: privilege_enum.CREATE,
    })

    const field_delete_privilege = new Privilege({
        slug: 'field-delete',
        name: 'Field delete',
        description: 'Field delete privilege',
        scope: field_scope,
        type: privilege_enum.DELETE,
    })

    const field_privileges = [
        field_edit_privilege,
        field_read_privilege,
        field_create_privilege,
        field_delete_privilege,
    ]

    const group_scope = new Scope({
        slug: 'group',
        name: 'Group',
        description: 'Group scope',
    })

    const group_edit_privilege = new Privilege({
        slug: 'group-edit',
        name: 'Group edit',
        description: 'Group edit privilege',
        scope: group_scope,
        type: privilege_enum.EDIT,
    })

    const group_read_privilege = new Privilege({
        slug: 'group-read',
        name: 'Group read',
        description: 'Group read privilege',
        scope: group_scope,
        type: privilege_enum.READ,
    })

    const group_create_privilege = new Privilege({
        slug: 'group-create',
        name: 'Group create',
        description: 'Group create privilege',
        scope: group_scope,
        type: privilege_enum.CREATE,
    })

    const group_delete_privilege = new Privilege({
        slug: 'group-delete',
        name: 'Group delete',
        description: 'Group delete privilege',
        scope: group_scope,
        type: privilege_enum.DELETE,
    })

    const group_privileges = [
        group_edit_privilege,
        group_read_privilege,
        group_create_privilege,
        group_delete_privilege,
    ]

    const privilege_scope = new Scope({ 
        slug: 'privilege',
        name: 'Privilege',
        description: 'Privilege scope',
    })

    const scopes = [
        user_scope,
        scope_scope,
        response_scope,
        form_scope,
        field_scope,
        group_scope,
        privilege_scope,
    ]

    const privilege_edit_privilege = new Privilege({
        slug: 'privilege-edit',
        name: 'Privilege edit',
        description: 'Privilege edit privilege',
        scope: privilege_scope,
        type: privilege_enum.EDIT,
    })

    const privilege_read_privilege = new Privilege({
        slug: 'privilege-read',
        name: 'Privilege read',
        description: 'Privilege read privilege',
        scope: privilege_scope,
        type: privilege_enum.READ,
    })

    const privilege_create_privilege = new Privilege({
        slug: 'privilege-create',
        name: 'Privilege create',
        description: 'Privilege create privilege',
        scope: privilege_scope,
        type: privilege_enum.CREATE,
    })

    const privilege_delete_privilege = new Privilege({
        slug: 'privilege-delete',
        name: 'Privilege delete',
        description: 'Privilege delete privilege',
        scope: privilege_scope,
        type: privilege_enum.DELETE,
    })

    const privilege_privileges = [
        privilege_edit_privilege,
        privilege_read_privilege,
        privilege_create_privilege,
        privilege_delete_privilege,
    ]

    group.privileges = [
        ...user_privileges,
        ...scope_privileges,
        ...response_privileges,
        ...form_privileges,
        ...field_privileges,
        ...group_privileges,
        ...privilege_privileges,
    ]

    const user = new User({
        email: 'b2024nimendoza@pshs.edu.ph',
        name: 'Neomi Mendoza',
        password: 'password',
        groups: [group],
    })

    data_source.transaction(async (manager) => {
        scopes.map(async (scope) => {
            await manager.save(scope)
        })

        group.privileges.map(async (privilege) => {
            manager.save(privilege)
        })

        await manager.save(group)
        await manager.save(user)
    })
}

export default seeder
