const express = require("express");
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const connectdb = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Route middleware
app.use('/api/v1/test', require('./routes/testroute'));
app.use('/api/v1/auth', require('./routes/authroute'));
app.use('/api/v1/inventory', require('./routes/inventoryroute'));
app.use('/api/v1/analytics', require('./routes/analyticsroute'));

// Connect to DB and then start server
connectdb()
  .then(() => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`.bgBlue.white);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
