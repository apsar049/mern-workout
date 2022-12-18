require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');

const app = express();

const workOutRoutes = require('./routes/workout.routes');
//middleware
app.use(express.json());

// app.use((req, res, next) => {
//   res.send('hello world');
// });

app.use('/api/workout', workOutRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        ` connected to the DATABASE and server running on port ${process.env
          .PORT}`
      );
    });
  })
  .catch(err => {
    console.log(err);
  });
