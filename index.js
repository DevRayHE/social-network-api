const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Returns the current working directory
// const cwd = process.cwd();

// PORT all in uppercase for Heroku deployment
const PORT = process.env.PORT || 3003;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', ()=> {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});

