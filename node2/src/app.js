import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path, { dirname} from 'path';
import { fileURLToPath } from 'url';
import usersRoutes from './routes/users.routes.js';
import authRoutes from './routes/auth.routes.js';
import authMiddleware from './middlewares/authMiddleware.js';
import todoRoutes from './routes/todo.routes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(cors());
app.use(express.json());

//Rutas
app.use('/users',authMiddleware,usersRoutes );
app.use('/auth',authRoutes);
app.use('/todos',authMiddleware,todoRoutes)

//Server
app.listen(PORT, () => {
    return console.log(`Server running at localhost:${PORT}`);
})