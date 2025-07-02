const express = require('express')
const cors = require('cors');
const app = express()

require('dotenv').config()

const PORT = process.env.PORT
//middlewars
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World')
})

const server = () => {
    console.log('You are listening to port:', PORT);
    app.listen(PORT, () => {
        console.log('Listening to port:', PORT)
    })
}

server()