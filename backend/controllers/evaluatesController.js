const joi = require('joi');
const { dataBase } = require('../infraestructure');

async function userEvaluateUser(req, res) {
    try {
        const { id } = req.params;
        const { text, rating } = req.body;

        if (Number(id) === req.auth.id) {
            const error = new Error('You can not evaluate yourself');
            err.httpCode = 409;
            throw error;
        }

        const schema = joi.object({
            text: joi.string().max(1000),
            rating: joi.number().min(0).max(5).required()
        });

        await schema.validateAsync({ text, rating });

        const userQuery = 'SELECT * FROM user WHERE id = ?';

        const [user] = await dataBase.pool.query(userQuery, [id]);

        if (!user || !user.length) {
            const error = new Error('The user that you are trying to evaluate do not exist');
            err.httpCode = 401;
            throw error;
        };

        const commentsQuery = 'INSERT INTO evaluate (id_user, id_user_eval, text, rating) VALUES (?, ?, ?, ?)';
        
        const [commentRows] = await dataBase.pool.query(commentsQuery, [req.auth.id, id, text, rating]);

        res.send({ status: 'ok', id_user: req.auth.id, id_user_eval: id, text, rating });

    } catch (err) {
        res.status(err.httpCode || 500);
        res.send({ error: err.message });
    };
};

async function getEvaluateByUserId(req, res) {
    try {
        const { userId } = req.params;

        if (Number(userId) !== req.auth.id) {
            const error = new Error('The user do not have any authorization');
            err.httpCode = 403;
            throw error;
        };

        const query = 'SELECT * FROM evaluate WHERE user_id';
    
        const [evaluates] = await dataBase.pool.query(query, userId);
        
        res.send(evaluates);

    } catch (err) {
        res.status(err.httpCode || 500);
        res.send({ error: err.message });
    };
};

module.exports = {
    userEvaluateUser,
    getEvaluateByUserId
};
