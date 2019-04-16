// const express = require('express');
// const app = express();
// const axios = require('axios');

// axios.get(`https://www.metaweather.com/api/location/2424766/`)
//   .then(response => {
//     // console.log(response.data[0].the_temp);
//     console.log(response.data.consolidated_weather);
//     res.send(response.data.consolidated_weather);
//   })
//   .catch(error => {
//     console.log(error);
//   });


// module.exports = app;


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

// const toDoListRoutes = require('./api/routes/toDoList');

axios.get(`https://www.metaweather.com/api/location/2424766/`)
  .then(response => {
    // console.log(response.data[0].the_temp);
    console.log(response.data.consolidated_weather);
    res.send(response.data.consolidated_weather);
  })
  .catch(error => {
    console.log(error);
  });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// app.use('/toDoList', toDoListRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;