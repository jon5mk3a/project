const joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { dataBase } = require('../infraestructure');
const { validateAuthorization } = require('../middlewares/validateAuth');

module.import = { validateAuthorization };

async function getUsers(req, res) {
    try {
        const [users] = await dataBase.pool.query('SELECT * FROM user');
        res.send(users);

    } catch (err) {
        res.status(500);
        res.send({ error: err.message });
    };
};

async function createUser(req, res) {
    try {
        const {
            photo,
            name,
            surname,
            address,
            phone,
            email,
            nickName,
            password,
            information
        } = req.body;

        const userSchema = joi.object({
            photo: joi.string().required(),
            name: joi.string().required(),
            surname: joi.string().required(),
            address: joi.string().required(),
            phone: joi.number().required(),
            email: joi.string().email().required(),
            nickName: joi.string().required(),
            password: joi.string().min(6).max(20).required(),
            information: joi.string().max(1000)
        });

        await userSchema.validateAsync({ photo, name, surname, address, photo, phone, email, nickName, password, information });

        const query = 'SELECT * FROM user WHERE email =?';
        const [users] = await dataBase.pool.query(query, [email]);

        if (users.length) {
            const err = new Error('Already exist an user with that email');
            err.code = 409;
            throw err;
        };

        if (nickName.length) {
            const err = new Error('Already exist an user with that nickname');
            err.code = 409;
            throw err;
        };

        const passwordHash = await bcrypt.hash(password, 10);

        const insertQuery = 'INSERT INTO user (photo, name, surname, address, phone, email, nick_name, password, information) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        
        const [insertRows] = await dataBase.pool.query(insertQuery, [photo, name, surname, address, phone, email, nickName, passwordHash, information]);

        const createId = insertRows.insertId;

        const selectQuery = 'SELECT * FROM user WHERE id = ?';
        
        const [selectRows] = await dataBase.pool.query(selectQuery, createId);

        res.send(selectRows[0]);

    } catch (err) {
        res.status(err.code || 500);
        res.send({ error: err.message });
    };
};

async function login(req, res) {
    try {
        const { email, nickName, password } = req.body;

        const schema = joi.object({
            email: joi.string().email().required(),
            nickName: joi.string().min(6).max(20).required(),
            password: joi.string().min(6).max(20).required()
        });

        await schema.validateAsync({ email, nickName, password });

        const query = 'SELECT * FROM user WHERE email = ? OR nickName = ?';

        const [rows] = await dataBase.pool.query(query, email, nickName);

        if (!rows || !rows.length) {
            const error = new Error('That user do not exist');
            error.code = 404;
            throw error;
        };

        const user = rows[0];

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            const error = new Error('Invalid password');
            error.code = 401;
            throw error;
        };

        const tokenPayload = { id: user.id };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.send({ token });

    } catch (err) {
        res.status(err.code || 500);
        res.send({ error: err.message });
    };
};

async function editUser(req, res) {
    try {
        const { id } = req.params;
        const {
            photo,
            name,
            surname,
            address,
            phone,
            email,
            nickName,
            password,
            information
        } = req.body;

        const schema = joi.object({
            photo: joi.string(),
            name: joi.string(),
            surname: joi.string(),
            address: joi.string(),
            phone: joi.number(),
            email: joi.string().email(),
            nickName: joi.string(),
            password: joi.string().min(6).max(20),
            information: joi.string().max(1000)
        });

        await schema.validateAsync({ photo, name, surname, address, phone, email, nickName, password, information });

        const updateQuery = ('UPDATE user SET photo = ?, name = ?, surname = ?, address = ?, phone = ?, email = ?, nickName = ?, password = ?, information = ? WHERE id = ?');

        await dataBase.pool.query(updateQuery, [photo, name, surname, address, phone, email, nickName, password, information, id]);

        const selectQuery = 'SELECT * FROM user WHERE id = ?';

        const [selectRows] = await dataBase.pool.query(selectQuery, id);

        res.send(selectRows[0]);

    } catch (err) {
        res.status(err.code || 500);
        res.send({ error: err.message });
    };
};

module.exports = {
    createUser,
    getUsers,
    login,
    editUser
};
