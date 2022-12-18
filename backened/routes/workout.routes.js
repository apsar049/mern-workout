const express = require('express');
const router = express.Router();
const {
  getWorkouts,
  createWorkout,
  singleWorkout,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workout.controls');

//get workout
router.get('/', getWorkouts);
//get single workout
router.get('/:id', singleWorkout);

//create workout
router.post('/', createWorkout);

router.delete('/:id', deleteWorkout);

router.patch('/:id', updateWorkout);

module.exports = router;
