const joi = require('joi');
const { dataBase } = require('../infraestructure');

async function getApartments(req, res) {
    try {
        const [apartments] = await dataBase.pool.query('SELECT * FROM apartment');
        res.send(apartments);
    } catch (err) {
        res.status(err.httpCode || 500);
        res.send({ error: err.message });
    };
};

async function createApartment(req, res) {
    try {
        const {
            photo,
            location,
            rooms,
            bathroom,
            lift,
            balcony,
            heating,
            furniture,
            internet,
            tv,
            price
        } = req.body;

        const userSchema = joi.object({
            photo: joi.string().required(),
            location: joi.string().required(),
            rooms: joi.number().required(),
            bathroom: joi.number().required(),
            lift: joi.boolean().required(),
            balcony: joi.boolean().required(),
            heating: joi.boolean().required(),
            furniture: joi.boolean().required(),
            internet: joi.boolean().required(),
            tv: joi.boolean().required(),
            price: joi.number().required()
        });

        await userSchema.validateAsync({ photo, location, rooms, bathroom, lift, balcony, heating, furniture, internet, tv, price });

        const query = 'SELECT * FROM apartment WHERE location = ?';
        
        const [apartment] = await dataBase.pool.query(query, [location]);

        if (apartment.length) {
            const err = new Error('Already exist an apartment with that location');
            err.httpCode = 409;
            throw err;
        };

        const insertQuery = 'INSERT INTO apartment (photo, location, rooms, bathroom, lift, balcony, heating, furniture, internet, tv, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        
        const [insertRows] = await dataBase.pool.query(insertQuery, [photo, photo, location, rooms, bathroom, lift, balcony, heating, furniture, internet, tv, price]);

        const createId = insertRows.insertId;

        const selectQuery = 'SELECT * FROM apartment WHERE id = ?';
        
        const [selectRows] = await dataBase.pool.query(selectQuery, [createId]);

        res.send(selectRows[0]);

    } catch (err) {
        res.status(err.httpCode || 500);
        res.send({ error: err.message });
    };
};

async function searchApartment(req, res) {
    try {
        const { id } = req.params;
        const { location, price, roomsNumber, date } = req.body;

        const schema = joi.object({
            location: joi.string().required(),
            price: joi.number().required(),
            roomsNumber: joi.number().required(),
            date: joi.date().required()
        });

        await schema.validateAsync({ location, price, roomsNumber, date, id });
        
        const selectQuery = ('SELECT id FROM apartment WHERE location = ? OR price = ? OR roomsNumber = ? OR date = ?');
        
        const [selectRows] = await dataBase.pool.query(selectQuery, [id])

        res.send(selectRows[0]);

    } catch (err) {
        res.status(err.httpCode || 500);
        res.send({ error: err.message });
    };
};

module.exports = {
    getApartments,
    createApartment,
    searchApartment
};
