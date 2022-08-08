require('dotenv').config();

const express = require('express');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose');
const cors = require('cors');

// express app
const app = express();

app.use(
    cors({
        origin: 'http://localhost:3000',
    })
)

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// connect to db
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => {
    console.log('Connected to MongoDB');
    // listen for requests
    app.listen(process.env.PORT, () => {
        console.log('Example app listening on port ' + process.env.PORT + '!');
    })
})
    .catch(err => {
        console.log(err);
    }
    );


