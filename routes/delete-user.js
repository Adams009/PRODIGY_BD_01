import  Router  from "express"
import deleted from "../controllers/delete-user.js"

const router = Router()

router.delete('/:id', deleted)

export default router