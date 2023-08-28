import fs from 'fs'
import jsyaml from 'js-yaml'
import swaggerUi from 'swagger-ui-express'

import { Router } from 'express'

import v1 from 'routes/v1'

const router = Router()
router.use('/v1', v1)

const spec = fs.readFileSync('src/@types/openapi.yaml', 'utf8')
const docs = jsyaml.load(spec)

if (docs) {
    router.use('/docs', swaggerUi.serve)
    router.get('/docs', swaggerUi.setup(docs))
} else {
    console.error('Unable to load OpenAPI documentation')
}

export default router
