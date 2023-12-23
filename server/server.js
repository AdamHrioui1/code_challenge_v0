require('dotenv').config()
const express = require('express')
const connection = require('./database/connection')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
let port = process.env.PORT || 8080

app.use(cors())
// app.use(cors({
//     origin: [''],
//     methods: ['POST', 'GET'],
//     credentials: true
// }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/sector', require('./routes/sectorRoutes'))
app.use('/api/customer', require('./routes/customerRoutes'))

app.get('/', (req, res) => {
    return res.json({ success: true, data: 'Home' })
})

connection()

app.listen(port, () => console.log(`Server is listening on port: http://localhost:${port}`))