require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const commentRoutes = require('./routes/commentRoutes')
const postRoutes = require('./routes/postRoutes')
const authRoutes = require('./routes/authRoutes');

// express app
const app = express();

// middleware
app.use(cors(), express.json())

// routes
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/auth', authRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen to the port
        app.listen(process.env.PORT, () => {
            console.log(`connected to db and listening to port ${process.env.PORT}`);
        })
    })
    .catch(err => {
        console.log(err)
    })
