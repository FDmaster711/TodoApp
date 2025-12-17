import express from 'express'
import { prisma } from '../db.js'

const router = express.Router();

router.get("/",async (req,res) => {
    try {
        const tasks = await prisma.todo.findMany({
            where:{
                userId: req.userId
            },
            orderBy:{
                createdAt: 'desc'
            }
        });
        res.status(200).json(
            {
                tasks
            })

    }catch(err){
        console.error(err.message);
        res.status(500).json({message: "Server has failed"});
    }
});

router.post("/", async (req, res) => {
    // 1. Extraemos también la prioridad
    const { task, priority } = req.body; 
    
    if(!task){
        return res.status(400).json({message:"You need to enter a task"});
    }
    try{
        const newTask = await prisma.todo.create({
            data:{
                task: task,
                priority: priority, 
                userId: req.userId
            }
        });
    res.status(201).json(
        {
            message: "Todo created successfully!",
            ...newTask
        })
      
    }catch(err){
        console.error(err.message);
        res.status(500).json({messsage: "Server has failed"});
    }
});

router.put("/:id", async (req,res) => {
    const {id} = req.params;
    const { completed, task, priority } = req.body; 

     if(isNaN(id)){return res.status(400).json({message: "Invalid id"});}

     try {
        const updatedTask = await prisma.todo.updateMany({
            where:{
                id: Number(id),
                userId: req.userId
            },
            data:{
               task: task !== undefined ? task : undefined,
               completed: completed !== undefined ? completed : undefined,
               priority: priority !== undefined ? priority : undefined
            }
        });

        if(updatedTask.count === 0) {return res.status(404).json({message: "Task not found or unauthorized"});}

        res.status(200).json({message: "Task updated successfully!"});

     } catch(err){
        console.log(err.message);
        res.status(500).json({message: "Server has failed"});
     }
});

router.delete("/:id", async (req,res) => {
    const {id} = req.params;
    
    if(isNaN(id)){return res.status(400).json({message: "Invalid id"});}
   try {
      const deletedTask = await prisma.todo.deleteMany({
        where:{
            id: Number(id),
            userId: req.userId
        }
      });

      if(deletedTask.count === 0){
        return res.status(404).json({message:"Task not found or unautorized"});
      }

      res.status(200).json({message: "Task deleted successfully!"});

   }catch(err){
    console.error(err.message);
    res.status(500).json({message: "Server has failed"});
   }
});

router.get("/:id",async (req,res) => {
    const {id} = req.params;

    if(isNaN(id)){
        return res.status(400).json({message: "Invalid id"});
    }
    try {
      const foundTask = await prisma.todo.findFirst({
        where:{
            id: Number(id),
            userId: req.userId
        }
      });
      
      if(!foundTask){return res.status(404).json({message: "Task not found or unauthorized"});}

      res.status(200).json({
        message: "Task successfully found!",
        ...foundTask
      })
    }catch (err) {
        console.error(err.message);
        res.status(500).json({message: "Server has failed"});

    }
})


export default router