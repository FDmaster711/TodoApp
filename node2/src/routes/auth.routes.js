import express from 'express'
import { prisma } from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body || {};

    if (!username || !password) {
        return res.status(400).json({ message: "Data is missing" });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const firstTodo = 'This is your first todo'; 

    try {
        const newUser = await prisma.user.create({
            data: {
                username: username,
                password: hashedPassword, 
                
                todos: {
                    create: {
                        task: firstTodo
                
                    }
                }
            },
            select:{
                id: true,
                username: true,
                createdAT: true,
                todos:true
            }
        });

        const token = jwt.sign(
            { id: newUser.id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: "User created successfully",
            token: token,
            user: newUser 
        });

    } catch (err) {
        
        if (err.code === 'P2002') {
            return res.status(400).json({ message: "The user already exits" });
        }
        console.error(err.message);
        res.status(500).json({
            message: "Server has failed"
        });
    }
});

router.post("/login", async (req,res) => {
    const {username,password} = req.body || {};
    if(!username || !password) { return res.status(400).json({message: "Data is missing"});}
    try {
        const currentUser = await prisma.user.findFirst({
            where:{
                username: username,
                estado: true
            }
        });
        if(!currentUser){
            return res.status(401).json({message:"Invalid credentials"});
        }
        const passwordIsValid = bcrypt.compareSync(password,currentUser.password);
        if(!passwordIsValid){
            return res.status(401).json({message:"Invalid credentials"});
        }
        const token = jwt.sign(
            {id: currentUser.id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        );
        res.status(200).json({message:"successfully logged in",
            token: token
        });
    } catch(err){

        console.error(err.message);
        res.status(500).json({message:"The server has failed"});
    }
} )

export default router