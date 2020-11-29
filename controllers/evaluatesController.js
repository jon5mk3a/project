const joi = require('joi');
const { dataBase } = require('../infraestructure');

async function userEvaluateUser(req, res) {
    try {
        const { userId } = req.params;
        const { id } = req.params;
        const { text, rating } = req.body;

        const schema = joi.object({
            text: joi.string().max(1000),
            rating: joi.number().min(0).max(5).required()
        });

        await schema.validateAsync({ text, rating });

        const selectQuery = 'SELECT * FROM user WHERE id = ?';

        const [evaluate] = await dataBase.pool.query(selectQuery, userId);

        if (!evaluate || !evaluate.length) {
            const error = new Error('The user that you are trying to evaluate do not exist');
            err.code = 404;
            throw error;
        }

        const commentsQuery = ('INSERT INTO evaluate (id_user, id_user, text, rating) VALUES (?, ?, ?, ?)');
        
        const [commentRows] = await dataBase.pool.query(commentsQuery, id);

        res.status(201);

        res.send(commentRows[0]);

    } catch (err) {
        res.status(err.code || 500);
        res.send({ error: err.message });
    };
};

async function getEvaluateByUserId(req, res) {
    try {
        const { userId } = req.params;

        if (Number(userId) !== req.auth.id) {
            const error = new Error('The user do not have any authorization');
            err.code = 403;
            throw error;
        };

        const query = 'SELECT * FROM evaluate WHERE user_id';
    
        const [evaluates] = await dataBase.pool.query(query, userId);
        
        res.send(evaluates);

    } catch (err) {
        res.status(err.code || 500);
        res.send({ error: err.message });
    };
};

module.exports = {
    userEvaluateUser,
    getEvaluateByUserId
};
