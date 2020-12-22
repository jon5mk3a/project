const joi = require('joi');
const { dataBase } = require('../infraestructure');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function getBooks(req, res) {
    try {
        const [books] = await dataBase.pool.query('SELECT * FROM user_apartment_request');
        res.send(books);
    } catch (err) {
        res.status(err.httpCode || 500);
        res.send({ error: err.message });
    };
};

async function doBooks(req, res) {
    try {
        
    } catch (err) {
        res.status(err.httpCode || 500);
        res.send({ error: err.message });
    };
};

module.exports = {
    getBooks,
    doBooks
};
