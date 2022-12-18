const mongoose = require('mongoose');
const Workout = require('../models/workout.model');
//getting all workiouts
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });

    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//creating a workout
const createWorkout = async (req, res) => {
  try {
    const { title, load, reps } = req.body;

    const workout = await Workout.create({ title, load, reps });
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//getting single workout from db
const singleWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'NO such workout available' });
  }

  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: 'No such workout available' });
  }

  res.status(200).json(workout);
};

//deleting a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'NO such workout' });
  }

  const workout = await Workout.findByIdAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: 'No such workout' });
  }

  res.status(200).json(workout);
};

//updating a workout

const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'no such workout' });
  }

  const workout = await Workout.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body
    }
  );

  if (!workout) {
    return res.status(400).json({ error: 'No such workout' });
  }

  res.status(200).json(workout);
};

module.exports = {
  getWorkouts,
  createWorkout,
  singleWorkout,
  deleteWorkout,
  updateWorkout
};
