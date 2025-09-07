import  Router  from "express"
import read from "../controllers/read-user.js"

const router = Router()

router.get('/:id', read)

export default router