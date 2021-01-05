const path = require('path')
const http = require('http')
const express = require('express')
const cors = require('cors')

const port = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())

const server = http.createServer(app)

server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
})
