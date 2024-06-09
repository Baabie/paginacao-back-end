const express = require('express');
const { Recado } = require('./models');
const router = express.Router();

router.get('/recados', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Recado.findAndCountAll({
            where: {
                userId: req.user.id 
            },
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']]
        });

        const totalPages = Math.ceil(count / limit);

        res.json({
            totalItems: count,
            totalPages: totalPages,
            currentPage: page,
            recados: rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar recados' });
    }
});

module.exports = router;
