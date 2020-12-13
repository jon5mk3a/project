require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const {
    usersController,
    apartmentsController,
    evaluatesController
} = require('./controllers');

const { validateAuthorization } = require('./middlewares');

const { HTTP_PORT } = process.env;

app.use(morgan('dev'));

app.use(bodyParser.json());

app.use(cors());

// Users
app.get('/api/users/getUsers', usersController.getUsers);
app.post('/api/users/createUser', usersController.createUser);
app.post('/api/users/login', usersController.login);
app.put('/api/users/:id/editUser', validateAuthorization, usersController.editUser);

// Apartments
app.get('/api/apartments/getApartments', apartmentsController.getApartments);
app.post('/api/apartments/createApartment', validateAuthorization, apartmentsController.createApartment);
app.get('/api/searchApartment', apartmentsController.searchApartment);

// Evaluate
app.post('/api/evaluate/:id/userEvaluateUser', validateAuthorization, evaluatesController.userEvaluateUser);
app.get('/api/evaluate/getEvaluateByUserId', validateAuthorization, evaluatesController.getEvaluateByUserId);

app.listen(HTTP_PORT, () => console.log(`Listening at port: ${HTTP_PORT}`));
