require('newrelic');
const express = require('express');
const path = require('path');
const axios = require('axios');
const proxy = require('http-proxy-middleware');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/loaderio-87911a3a551502cb94679df640ae45aa', (req, res) => {
  res.sendFile(path.join(__dirname, '.loaderio-87911a3a551502cb94679df640ae45aa.txt'));
});

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/api//reservations', (req, res) => {
  axios.get('http://ec2-34-219-185-148.us-west-2.compute.amazonaws.com/api/4689cca8-5498-45e3-8761-ab3ce1962358/reservations')
    .then(resp => res.status(200).send(resp.data))
    .catch(err => res.status(500).end(err.message));
});

app.use('/api/overview/:id', //will
  proxy({
    target: 'http://54.144.31.20',
    changeOrigin: true
  })
);


app.use('/api/:id/', //brian
  proxy({
    target: 'http://3.16.143.18',
    changeOrigin: true
  })
);

app.use('/restaurants/:id', //mina
  proxy({
    target: 'http://18.223.247.137:2000',
    changeOrigin: true
  })
);

// app.all('/*', (req, res) => {
//   const url = 'http://ec2-34-219-185-148.us-west-2.compute.amazonaws.com' + req.url;
//   let headers = Object.create(req.headers);
//   delete headers['connection'];
//   const options = {
//     method: req.method,
//     headers: headers,
//     params: req.query,
//     data: req.body,
//     url,
//   };
//   axios(options)
//     .then((result) => {
//       res.statusMessage = result.statusText;
//       res.set(result.headers).status(result.status).send(result.data);
//     })
//     .catch((error) => {
//       if (error.response !== undefined) {
//         res.statusMessage = error.response.statusText;
//         res.set(error.response.headers).status(error.response.status).send(error.response.data);
//       } else {
//         res.statusMessage = 'Back-end server is at capacity';
//         res.status(503).send();
//       }
//     });
// });

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
