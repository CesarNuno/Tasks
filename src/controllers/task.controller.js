import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getTasks = async (req, res) => {
    const {id} = req.params;
    console.log("/tasks get" + id)
    const test = await prisma.task.findMany({
        where:{
            userId: {
                equals: Number(id)
            }
        }
    })
    res.json(test)
}

export const addTasks = async (req, res) => {
    const {name, description, userId} = req.body
    console.log("/tasks post")
    const register = await prisma.task.create({
        data:{
            name,
            description,
            userId
        }
    })
    res.json(register)
}

export const getTaskByName = async (req, res) =>{
    const {name} = req.params;
    console.log("/tasks name")
    try {
        const test = await prisma.task.findFirstOrThrow({
            where:{
                name: name
            },
        })
        res.json(test)
    } catch (e) {
        if(e === 'P2025'){
            res.status(404).send('No existe la tarea');
          }else{
            res.status(400).send('Error: ' + e)
          }
    }
    
}

export const getTaskById = async (req, res) =>{
    const {id} = req.params;
    console.log("/tasks id")
    const test = await prisma.task.findMany({
        where:{
            id: Number(id)
        },
    })
    res.json(test)
}

export const updateTask = async (req, res) =>{
    console.log("/tasks put")
    const {id} = req.params
    const {name, description, status} = req.body
    const up = await prisma.task.update({
        where:{
            id: Number(id)
        },
        data:{
            name: name,
            description: description,
            status: status
        }
    })
    res.json(up)
}

export const deleteTask = async (req, res) =>{
    console.log("/tasks delete")
    const {id} = req.params
    const del = await prisma.task.delete({
        where:{
            id: Number(id)
        },
    })
    res.json(del)
}

export const completeTask = async (req, res) =>{
    console.log("/tasks comp")
    const {id} = req.params
    const comp = await prisma.task.update({
        where:{
            id: Number(id)
        },
        data:{
            status: true
        }
    })
    res.json(comp)
}

export const completedTasks = async(req, res)=>{
    console.log("/tasks/completed");
    try {
        const {id} = req.params;
        const test = await prisma.task.findMany({
            where:{
                userId: {
                    equals: Number(id)
                },
                status:{
                    equals: true
                }
            }
        })
        res.json(test)
    } catch (error) {
        res.status(400).send('Error: + ' + error)
    }
}

export const inProgressTasks = async(req, res)=>{
    console.log("/tasks/progress");
    try {
        const {id} = req.params;
        const test = await prisma.task.findMany({
            where:{
                userId: {
                    equals: Number(id)
                },
                status:{
                    equals: false
                }
            }
        })
        res.json(test)
    } catch (error) {
        res.status(400).send('Error: + ' + error)
    }
}
