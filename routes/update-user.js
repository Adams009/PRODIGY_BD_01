import  Router  from "express"
import  update  from '../controllers/update-user.js'

const router = Router()

router.patch('/:id', update)

export default router