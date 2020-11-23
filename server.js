require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const {
    usersController,
    apartmentsController,
    evaluatesController
} = require('./controllers');

const { validateAuthorization } = require('./middlewares');

const { HTTP_PORT } = process.env;

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());

// Users
app.get('/api/users', usersController.getUsers);
app.post('/api/users', validateAuthorization, usersController.createUser);
app.post('/api/users/login', usersController.login);
app.put('/api/users/editUser', usersController.editUser);

// Apartments
app.get('/api/apartments', apartmentsController.getApartments);
app.post('/api/apartments', validateAuthorization, apartmentsController.createApartment);
app.get('/api/searchApartment', apartmentsController.searchApartment);

// Evaluate
app.post('/api/evaluate', evaluatesController.userEvaluateUser);


app.listen(HTTP_PORT, () => console.log(`Listening at port: ${HTTP_PORT}`));
