const joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { dataBase } = require('../infraestructure');

async function getUsers(req, res) {
    try {
        const [users] = await dataBase.pool.query('SELECT * FROM user');
        res.send(users);

    } catch (err) {
        res.status(res.satus || 500);
        res.send({ error: err.message });
    };
};

async function createUser(req, res) {
    try {
        const userData = req.body

        const { photo, name, surname, address, phone, email, nick_name, password, information} = userData

        const userSchema = joi.object({
            photo: joi.string(),
            name: joi.string().required(),
            surname: joi.string().required(),
            address: joi.string().required(),
            phone: joi.number().required(),
            email: joi.string().email().required(),
            nick_name: joi.string().required(),
            password: joi.string().min(6).max(20).required(),
            information: joi.string().max(1000)
        });

        await userSchema.validateAsync({ photo, name, surname, address, phone, email, nick_name, password, information });
        

        const query = 'SELECT * FROM user WHERE email = ? OR nick_name = ?';
        const [users] = await dataBase.pool.query(query, [email, nick_name]);

        if (users.length) {

            const err = new Error('Already exist an user with that email or that nickname');
            err.httpCode = 400;
            throw err;
        };

        const passwordHash = await bcrypt.hash(password, 10);

        userData.password = passwordHash;

        const insertQuery = 'INSERT INTO user SET ?';
        
        const [insertRows] = await dataBase.pool.query(insertQuery, [userData]);
        
        const createId = insertRows.insertId;

        const selectQuery = 'SELECT * FROM user WHERE id = ?';
        
        const [selectRows] = await dataBase.pool.query(selectQuery, [createId]);

        res.send(selectRows[0]);

    } catch (err) {
        //res.status(err.code || 500);
        res.status(err.httpCode || 500).send({ error: err.message });
    };
};

async function login(req, res) {
    try {
        const { nick_name, password } = req.body;

        const schema = joi.object({
            nick_name: joi.string().min(6).max(20).required(),
            password: joi.string().min(6).max(20).required()
        });

        await schema.validateAsync({ nick_name, password });

        const query = 'SELECT * FROM user WHERE nick_name = ?';

        const [rows] = await dataBase.pool.query(query, [nick_name]);

        if (!rows || !rows.length) {
            const error = new Error('That user do not exist');
            error.httpCode = 401;
            throw error;
        };

        const user = rows[0];

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            const error = new Error('Invalid password');
            error.httpCode = 401;
            throw error;
        };

        const tokenPayload = { id: user.id };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.send({ token });

    } catch (err) {
        res.status(err.httpCode || 500);
        res.send({ error: err.message });
    };
};

async function editUser(req, res) {
    try {
        const { id } = req.params;
      
        if (Number(id) !== req.auth.id) {
            const err = new Error('You do not have permissions to edit this user');
            err.httpCode = 403;
            throw err;
        }
        // Pendiente de validar password!!!
        const {
            photo,
            name,
            surname,
            address,
            phone,
            email,
            nick_name,
            information
        } = req.body;

        const schema = joi.object({
            photo: joi.string(),
            name: joi.string(),
            surname: joi.string(),
            address: joi.string(),
            phone: joi.number(),
            email: joi.string().email(),
            nick_name: joi.string(),
            information: joi.string().max(1000)
        });

        await schema.validateAsync({ photo, name, surname, address, phone, email, nick_name, information });

        const updateQuery = 'UPDATE user SET photo = ?, name = ?, surname = ?, address = ?, phone = ?, email = ?, nick_name = ?, information = ? WHERE id = ?';

        await dataBase.pool.query(updateQuery, [photo, name, surname, address, phone, email, nick_name, information, id]);

        const selectQuery = 'SELECT * FROM user WHERE id = ?';

        const [selectRows] = await dataBase.pool.query(selectQuery, id);

        res.send(selectRows[0]);

    } catch (err) {
        res.status(err.httpCode || 500);
        res.send({ error: err.message });
    };
};

module.exports = {
    createUser,
    getUsers,
    login,
    editUser
};
