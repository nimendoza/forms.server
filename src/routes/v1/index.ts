import { Router } from 'express'

import users from 'routes/v1/users'
import fields from 'routes/v1/fields'
import scopes from 'routes/v1/scopes'
import responses from 'routes/v1/responses'
import privilege from 'routes/v1/privilege'
import groups from 'routes/v1/groups'
import forms from 'routes/v1/forms'

const router = Router()
router.use('/users', users)
router.use('/fields', fields)
router.use('/scopes', scopes)
router.use('/responses', responses)
router.use('/privileges', privilege)
router.use('/groups', groups)
router.use('/forms', forms)

export default router
