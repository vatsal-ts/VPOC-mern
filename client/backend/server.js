const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require("passport");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = require("./config/keys").mongoURI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Routes
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const categoryRouter = require('./routes/category');

app.use('/products', productsRouter);
app.use('/category',categoryRouter);
app.use('/', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}!`);
});

