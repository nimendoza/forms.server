import { Router } from 'express'

import { create, list, get, update, remove, access } from 'controllers/responses'
import { create as check_create, get as check_get, update as check_update, remove as check_remove } from 'middleware/responses'
import { add_info, check } from 'middleware/users'
import { check_token } from 'middleware/token'
import { privileges } from 'orm/entities/privileges'

const router = Router()
router.post('/', check_token(true), add_info(privileges.CREATE, new Set(['responses'])), check, check_create, create)
router.get('/', check_token(true), add_info(privileges.READ, new Set(['responses'])), check, check_get, list)
router.get('/:slug', check_token(true), add_info(privileges.READ, new Set(['responses'])), check, check_get, get)
router.put('/:slug', check_token(true), add_info(privileges.EDIT, new Set(['responses'])), check, check_update, update)
router.delete('/:slug', check_token(true), add_info(privileges.DELETE, new Set(['responses'])), check, check_remove, remove)
router.get('/:slug/access', check_token(true), add_info(privileges.READ, new Set(['responses'])), check, access)
router.get('/access', check_token(true), add_info(privileges.READ, new Set(['responses'])), check, access)

export default router
