const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 8000
const {errorHandler} = require('./middleware/errorMiddleware')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use(errorHandler)

app.listen(port,() => console.log(`Server Started in port ${port}`))