const express = require('express');
const app = express();

app.get('/test', (req, res) => {
  res.send('Hello, world!');
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});

module.exports = app;
