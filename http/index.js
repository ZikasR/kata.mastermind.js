const express = require('express');

const app = express();

app.get('/mastermind/token', (_, res) => {
  const token = Math.random()
    .toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  res.send(token);
  console.log('New token: ', token);
});

app.post('/', (_, res) => {
  res.send('Got a POST request');
});

app.listen(3000, () => {
  console.log('Master Mind');
});
