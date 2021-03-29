const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')

// Import Routes
const authRoute = require('./routes/auth')
const recipesRoute = require('./routes/recipes')

dotenv.config()

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, () => 
    console.log('connected to db!')
)

// Middleware
app.use(cors())
app.use(express.json())
// Route Middlewares
app.use('/auth', authRoute)
app.use('/recipes', recipesRoute)

app.listen(3001, () => console.log(`Server listening on port 3001`))