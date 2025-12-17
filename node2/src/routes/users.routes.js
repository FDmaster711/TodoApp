import express from 'express'
import { prisma } from '../db.js'
import bcrypt from 'bcrypt'

const router = express.Router();


router.get("/", async (req,res) => {
    let {estado} = req.query;  
    const whereOptions = {};

    if(estado){
        estado = estado.trim().toLowerCase();
    }
    try {

        if (estado === 'true') {
            whereOptions.estado = true;
        } else if (estado === 'false') {
            whereOptions.estado = false;
        }
        const users = await prisma.user.findMany({
            where: whereOptions   
        });
        res.status(200).json({users});

      } catch(err){
        console.error(err.message);
        res.status(500).json({message: "Server has failed"});

      }
});

router.get("/me",async (req, res) => {
    try {
        // req.userId viene del authMiddleware después de verificar el token
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId 
            },
            select: {
                id: true,
                username: true,
                // NO selecciones el password aquí por seguridad
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/:id", async (req,res) => {
    const {id} = req.params;
    const {username,password,estado} = req.body || {};

    if(isNaN(id)){
        return res.status(401).json({message: "Invalid Id"});
    }

    if(!username || !password){
        return res.status(400).json({message: "You need to enter a username and a password"});
    }
    if(!estado){
        return res.status(401).json({message: "You need to enter an status"});
    }
    const hashedPassword = bcrypt.hashSync(password,8);
    try {
        const updatedUser = await prisma.user.update({
            where:{
                id: Number(id)
            },
            data:{
                username: username,
                password: hashedPassword,
                estado:estado
            }
        });
         res.status(200).json({
            message: "User updated succefully!",
            ...updatedUser
        });
        

    } catch(err){
        if(err.code === 'P2025'){
            return res.status(404).json({message: "user not found."});
        }
        console.error(err.message);
        res.status(500).json({message: "Server has failed"})
    }
});

router.delete("/:id", async (req,res) => {
    const {id} = req.params;

    if(isNaN(id)){
        return res.status(400).json({message: "Invalid id"});
    }


    try {
      const deletedUser = await prisma.user.update({
        where:{
            id: Number(id)
        },
        data:{
            estado:false
        }
      });
      
       res.status(200).json({
        message: "User desactivated succesfully!",
        ...deletedUser
      })
      
    } catch(err){
     if(err.code === 'P2025'){
            return res.status(404).json({message: "user not found."});
        }
        console.error(err.message);
        res.status(500).json({message: "Server has failed"});
    }
});

router.get("/:id", async (req,res) => {
    const {id} = req.params;

    if(isNaN(id)){
        return res.status(400).json({message: "Invalid id"});
    }

    try {
        const foundUser = await prisma.user.findFirst({
            where:{
                id: Number(id),
                estado: true 
            }
        });

    
        if (!foundUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User found succesfully!",
            ...foundUser
        });

    } catch(err){
        console.error(err.message);
        res.status(500).json({message:"Server has failed"});
    }
})

export default router
