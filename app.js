const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const authRouter = require('./routes/api/auth');
const reviewRouter = require('./routes/api/reviews');
const tasksRouter = require('./routes/api/tasks');

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.static('public'));

app.use('/api/auth', authRouter);

app.use('/api/tasks', tasksRouter)

app.use('/api/reviews', reviewRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
