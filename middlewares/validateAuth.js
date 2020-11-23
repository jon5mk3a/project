const jwt = require('jsonwebtoken');

const { dataBase } = require('../infraestructure');

async function validateAuthorization(req, res, next) {
    try {
        const { authorization } = req.headers;

        if(!authorization || !authorization.startsWith('Bearer ')) {
            error.code = 401;
            throw error;
        };

        const token = authorization.slice(7, authorization.length);
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

        const query = 'SELECT * FROM user WHERE id = ?';
        const [users] = await dataBase.pool.query(query,decodeToken.id);

        if (!users || !users.length) {
            const error = new Error('The user do not exist');
            err.code = 401;
            throw error;
        };

        req.auth = decodeToken;
        next();

    } catch (err) {
        res.status(err.code || 500);
        res.send({ error: err.message });
    };
};

module.exports = { validateAuthorization };
