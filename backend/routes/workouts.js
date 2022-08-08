const express = require('express');
const {
    createWorkout,
    getAllWorkouts,
    getWorkoutById,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// requireAuth is a middleware that checks if the user is logged in
router.use(requireAuth);

// GET to home page
router.get('/', getAllWorkouts);

// GET a single workout
router.get('/:id', getWorkoutById);

// POST a new workout
router.post('/', createWorkout);

// DELETE a workout
router.delete('/:id', deleteWorkout);

// PUT to update a workout
router.put('/:id', updateWorkout);

module.exports = router;