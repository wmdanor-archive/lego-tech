require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*',
}));

app.use((req, res) => {
  const url = new URL(req.url, 'https://dataservice.accuweather.com');
  url.searchParams.set('apikey', process.env.ACCUWEATHER_API_KEY);

  console.log('Got request: ' + req.url);
  axios.request({
    method: 'GET',
    url: url.toString(),
  })
    .then(r => {
      res.status(r.status).json(r.data);
    })
    .catch(err => {
      if (axios.isAxiosError(err)) {
        res.status(err.response.status).json(err.response.data);

        return;
      }

      res.sendStatus(500);
    });
});

app.listen(8080, () => {
  console.log('Mock backend listening on 8080');
});
