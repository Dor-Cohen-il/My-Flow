const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const path = require('path'); // נדרש עבור path.join ו-path.resolve
const app = express()
const bcrypt = require('bcrypt')
require('dotenv').config()

console.log('NODE_ENV is:', process.env.NODE_ENV);

const port = process.env.PORT || 8080 // שיניתי ל-port באותיות קטנות כדי להתאים לשימוש למטה


// Middlewares
app.use(express.json())
app.use(cors())


// Routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

if (process.env.NODE_ENV === 'production') {
  const frontendBuildPath = path.join(__dirname, 'frontend', 'build');
  console.log('מנסה להגיש קבצי React סטטיים מהנתיב:', frontendBuildPath); // <--- הוסף את השורה הזו
  app.use(express.static(frontendBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(frontendBuildPath, 'index.html'));
  });
}

const server = () => {
    db()
    app.listen(port, () => { // שימוש ב-port באותיות קטנות
        console.log('Listening to port:', port) // שימוש ב-port באותיות קטנות
    })
}

server()