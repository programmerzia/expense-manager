const path = require('path')
const http = require('http')
const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/user')
const port = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(userRouter)
const server = http.createServer(app)
require('./db/db')
app.get('/', (req, res)=>{
    res.send({status: res.statusCode, msg:"Welcome! You are in a right place to start joueney!!"});
})

server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
})
