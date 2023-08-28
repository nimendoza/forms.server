import { Router } from 'express'

import { create, list, get, update, remove } from 'controllers/users'
import { login } from 'controllers/auth'
import { login as check_login } from 'middleware/auth'
import { add_info, check, create as check_create, get as check_get, update as check_update, remove as check_remove } from 'middleware/users'
import { check_token } from 'middleware/token'
import { privileges } from 'orm/entities/privileges'

const router = Router()
router.post('/', check_token(true), add_info(privileges.CREATE, 'users'), check, check_create, create)
router.get('/', check_token(true), add_info(privileges.READ, 'users'), check, check_get, list)
router.get('/:email', check_token(true), add_info(privileges.READ, 'users'), check, check_get, get)
router.put('/:email', check_token(true), add_info(privileges.EDIT, 'users'), check, check_update, update)
router.delete('/:email', check_token(true), add_info(privileges.DELETE, 'users'), check, check_remove, remove)
router.post('/login', check_login, login)

export default router
