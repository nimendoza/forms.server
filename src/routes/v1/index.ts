import { Router } from 'express'

import users from 'routes/v1/users'
import fields from 'routes/v1/fields'

const router = Router()
router.use('/users', users)
router.use('/fields', fields)

export default router
