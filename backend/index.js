import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import routes from './routes/user.js'
import path from 'path'

dotenv.config()

 const __dirname = path.resolve();

const app = express()
const PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname,"/client/dist")))

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,"client","dist","index.html"))
})

app.use(express.json())
app.use(cookieParser())
app.use(cors())

// routes
app.use('/api/v1/auth',routes)

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('Database Connection Successfully')
}).catch((e) => {
    console.log('Error While Connecting Database',e)
})

app.listen(PORT,() => {
    console.log(`Server is running on PORT ${PORT}`)
})