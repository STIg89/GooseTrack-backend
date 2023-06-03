require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

const { PORT = 4000, DB_HOST, BASE_URL } = process.env;

mongoose.set('strictQuery', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on: ${BASE_URL}:${PORT}`);
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
