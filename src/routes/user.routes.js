import { Router } from "express"
import { addUser, deleteUser, getUser, getUserById, updateUser } from "../controllers/user.controller.js"


const router =  Router()

router.get('/user/', getUser)
router.get('/user/:id',getUserById)
router.post('/user/', addUser )
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

export default router


