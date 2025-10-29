import express from 'express';
import {ConnectDb} from './database/mongodb.js'
import {PORT} from './config/env.js'
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';


const app = express();

dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: false,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use(express.urlencoded({extended:true}));

app.use('/api/v1/auth', authRouter);



app.listen(PORT, ()=>{
  ConnectDb()
  console.log(`Server is live`);
})


export default app;