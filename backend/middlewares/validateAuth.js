const jwt = require('jsonwebtoken');

const { dataBase } = require('../infraestructure');

async function validateAuthorization(req, res, next) {
    try {
        const { authorization } = req.headers;

        if (!authorization || !authorization.startsWith('Bearer ')) {
            const error = new Error('Authorization header required');
            error.httpCode = 401;
            throw error;
        };

        const token = authorization.slice(7, authorization.length);

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodeToken);
        const query = 'SELECT * FROM user WHERE id = ?';

        const [user] = await dataBase.pool.query(query, [decodeToken.id]);

        if (!user || !user.length) {
            const error = new Error('The user do not exist');
            err.httpCode = 401;
            throw error;
        };

        req.auth = decodeToken;
        next();

    } catch (err) {
        res.status(err.httpCode || 500);
        res.send({ error: err.message });
    };
};

module.exports = { validateAuthorization };
