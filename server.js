require('newrelic');
const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.all('/*', (req, res) => {
  const url = 'http://localhost:5882' + req.url;
  let headers = Object.create(req.headers);
  delete headers['connection'];
  const options = {
    method: req.method,
    headers: headers,
    params: req.query,
    data: req.body,
    url,
  };
  axios(options)
    .then((result) => {
      res.statusMessage = result.statusText;
      res.set(result.headers).status(result.status).send(result.data);
    })
    .catch((error) => {
      if (error.response !== undefined) {
        res.statusMessage = error.response.statusText;
        res.set(error.response.headers).status(error.response.status).send(error.response.data);
      } else {
        res.statusMessage = 'Back-end server is at capacity';
        res.status(503).send();
      }
    });
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
