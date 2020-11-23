const joi = require('joi');
const { dataBase } = require('../infraestructure');

async function userEvaluateUser(req, res) {
    try {
        const { id } = req.params;
        const { text, rating } = req.body;

        const schema = joi.object({
            text: joi.string().max(1000),
            rating: joi.number().min(0).max(5).required()
        });

        await schema.validateAsync({ text, rating });

        const commentsQuery = ('INSERT INTO evaluate (id_user, id_user, text, rating) VALUES (?, ?, ?, ?)');
        
        const [commentRows] = await dataBase.pool.query(commentsQuery, id);

        res.send(commentRows[0]);

    } catch (err) {
        res.status(err.code || 500);
        res.send({ error: err.message });
    };
};

module.exports = {
    userEvaluateUser
};
