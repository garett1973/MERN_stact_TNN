const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// get all workouts
const getAllWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1});
    res.status(200).json(workouts);
}


// get a single workout by id
const getWorkoutById = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message: 'Invalid ID'});
    }

    const workout = await Workout.findById(id);

    if (!workout) {
        return res.status(404).json({message: 'Workout not found'});
    }
    res.status(200).json(workout);
}


// create a new workout
const createWorkout = async (req, res) => {
    const {title, reps, load} = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push('title');
    }

    if (!reps) {
        emptyFields.push('reps');
    }

    if (!load) {
        emptyFields.push('load');
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({message: 'Missing required fields', emptyFields});
    }
    // add doc to db
    try {
        const workout = await Workout.create({title, reps, load});
        res.status(201).json(workout);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// delete a workout by id
const deleteWorkout = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message: 'Invalid ID'});
    }

    const workout = await Workout.findByIdAndDelete({_id: id});

    if (!workout) {
        return res.status(404).json({message: 'Workout not found'});
    }
    res.status(200).json(workout);
}

// update a workout by id
const updateWorkout = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message: 'Invalid ID'});
    }

    const workout = await Workout.findByIdAndUpdate(id, {...req.body}, {new: true});

    if (!workout) {
        return res.status(404).json({message: 'Workout not found'});
    }
    res.status(201).json(workout);
}

module.exports = {
    createWorkout,
    getAllWorkouts,
    getWorkoutById,
    deleteWorkout,
    updateWorkout
};