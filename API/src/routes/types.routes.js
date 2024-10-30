import { Router } from 'express'
import {
    getType, postType, putType, delType
} from '../controllers/types.controller'

const router = Router()
router.get('/types', getType)
router.post('/new-type', postType)
router.delete('/del-type/:IdTipoRuta', delType)
router.put('/mod-type/:IdTipoRuta', putType)
export default router