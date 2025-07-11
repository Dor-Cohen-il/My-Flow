const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express()
const bcrypt = require('bcrypt')
require('dotenv').config()

const PORT = process.env.PORT

//middlewars
app.use(express.json())
app.use(cors())


//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))
// Delete when finished
app.get('/', (req, res) => {
    res.send('Hello World')
})

const users = []


const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('Listening to port:', PORT)
    })
}

server()