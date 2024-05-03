import { Router } from "express"
import { addTasks, completeTask, completedTasks, deleteTask, getTaskById, getTasks, inProgressTasks, updateTask, getTaskByName  } from "../controllers/task.controller.js"
import { addUser, deleteUser, getUser, getUserById, updateUser, verifyLogin } from "../controllers/user.controller.js"

const router =  Router()

router.get('/task/:id', getTasks)
router.get('/task/:id/number',getTaskById)
router.get('/task/:name/:id/name',getTaskByName)
router.get('/task/:id/completed',completedTasks)
router.get('/task/:id/progress',inProgressTasks)
router.post('/task/', addTasks )
router.put('/task/:id', updateTask)
router.put('/task/:id/finish',completeTask)
router.delete('/task/:id', deleteTask)

router.get('/user/', getUser)
router.get('/user/:id',getUserById)
router.post('/user/', addUser )
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)
router.post('/user/login/',verifyLogin)

export default router


