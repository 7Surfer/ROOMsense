const express = require('express');
const bodyParser = require('body-parser');
const sensorData = require("../backend/database/database");

const app = express();


app.use(bodyParser.json());

//verhindert Browser Request nach Favicon, würde middlewares doppelt ausführen
app.get('/favicon.ico', (req, res, next) => {
  res.status(204);
});


app.use((req, res, next) => {
  //egal auf welcher Domain App läuft
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  //welche http Methoden für Requests verwendet werden dürfen
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});



app.get('/api/data', (req, res, next) => {
  sensorData.getCurrentData().then(fetchedFata => {
    // let transformedData = JSON.stringify(JSON.parse(fetchedFata));
    // console.log('Transformiert: ' + transformedData);
    console.log(fetchedFata);
    res.status(201).json({
      message: 'Data fetched!',
      data: fetchedFata
    });
  });
});


// app.get('/api/data', (req, res, next) => {
//   sensorData.getCurrentData().then((fetchedData) => {
//     console.log('\nFetched Data Parsed: ' + fetchedData);
//     res.status(201).send({
//       message: 'Data fetched successfully!',
//       data: fetchedData
//     });
//   }).catch((err) => {
//     console.log(err);
//   });
// });



module.exports = app;