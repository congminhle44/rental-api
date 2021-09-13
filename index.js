/** @format */

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config');

const port = process.env.PORT || config.port;
app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});

mongoose
  .connect(config.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to database successfully'))
  .catch(console.log);

app.use(
  cors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.use(express.json());

app.use('/uploads', express.static('./uploads'));

app.use('/properties', require('./Controller/Property'));
app.use('/properties', require('./Controller/Note'));
