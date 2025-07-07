const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express()

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

const server = () => {
    db()
    console.log('You are listening to port:', PORT);
    app.listen(PORT, () => {
        console.log('Listening to port:', PORT)
    })
}

server()


//https://www.youtube.com/watch?v=i0JesTevAcA