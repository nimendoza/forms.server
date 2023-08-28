import { Router } from 'express'

import { create, list, get, update, remove } from 'controllers/scopes'
import { create as check_create, get as check_get, update as check_update, remove as check_remove } from 'middleware/scopes'
import { add_info, check } from 'middleware/users'
import { check_token } from 'middleware/token'
import { privileges } from 'orm/entities/privileges'

const router = Router()
router.post('/', check_token(true), add_info(privileges.CREATE, 'scopes'), check, check_create, create)
router.get('/', check_token(true), add_info(privileges.READ, 'scopes'), check, check_get, list)
router.get('/:slug', check_token(true), add_info(privileges.READ, 'scopes'), check, check_get, get)
router.put('/:slug', check_token(true), add_info(privileges.EDIT, 'scopes'), check, check_update, update)
router.delete('/:slug', check_token(true), add_info(privileges.DELETE, 'scopes'), check, check_remove, remove)

export default router
