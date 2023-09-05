import { Router } from 'express'

import { create, list, get, update, remove, enable, access } from 'controllers/users'
import { login, verify } from 'controllers/auth'
import { login as check_login } from 'middleware/auth'
import { add_info, check, create as check_create, get as check_get, update as check_update, remove as check_remove, enable as check_enable } from 'middleware/users'
import { check_token } from 'middleware/token'
import { privileges } from 'orm/entities/privileges'

const router = Router()
router.post('/', check_create, create)
router.get('/', check_token(true), add_info(privileges.READ, new Set(['users'])), check, check_get, list)
router.get('/:email', check_token(true), add_info(privileges.READ, new Set(['users'])), check, check_get, get)
router.put('/:email', check_token(true), add_info(privileges.EDIT, new Set(['users'])), check, check_update, update)
router.delete('/:email', check_token(true), add_info(privileges.DELETE, new Set(['users'])), check, check_remove, remove)
router.post('/login', check_login, login)
router.get('/verify', check_token(true), verify)
router.put('/:email/enable', check_token(true), add_info(privileges.EDIT, new Set(['users'])), check, check_enable, enable)
router.get('/:email/access', check_token(true), add_info(privileges.READ, new Set(['users'])), check, access)
router.get('/access', check_token(true), add_info(privileges.READ, new Set(['users'])), check, access)

export default router
