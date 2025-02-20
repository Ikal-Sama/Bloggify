import express from 'express'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from 'dotenv'
import { connectToDB } from './utils/connectdb.js';

import authRoute from './routes/auth.js'
import postRoute from './routes/post.js'

dotenv.config();
connectToDB();

const app = express()
const port = process.env.PORT

const corsOption = {
    origin: process.env.FRONTEND_URL,
    method: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
}

app.use(cors(corsOption))
app.use(bodyParser.json());
app.use(cookieParser())
app.use(express.json())

app.use("/images", express.static("images"))
// Routes
app.use('/api/user', authRoute)
app.use('/api/post', postRoute)

app.get('/', (req, res, next) => {
    res.send('Hello World!')
})


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message  || "Internal Server Error";
    res.status(statusCode).json({error: message})
})

app.listen(port , () => {
    console.log(`Server is running on port ${port}`)
})