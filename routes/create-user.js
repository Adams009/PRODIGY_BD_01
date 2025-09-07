import  Router  from "express"
import create from "../controllers/create-user.js"

const router = Router()

router.post('/', create)

export default router
