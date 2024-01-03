const router = require('express').Router();
const { Op } = require('sequelize');
const { Career } = require('../../models/models');

router.get('/', async (req, res) => {
    try {
        const { search } = req.query;
        let whereCondition = {};
        
        if (search && search.length > 0) {
            whereCondition = {
                name: {
                    [Op.iLike]: `%${search}%`
                }
            };
        }
        
        const careers = await Career.findAll({
            where: whereCondition
        });
        
        res.status(200).json(careers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = (req.params.id);
        const career = await Career.findByPk(id);
        res.status(200).json(career);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error });
    }
})

router.post('/', async (req, res) => {
    try {
        const career = await Career.create(req.body);
        res.status(200).json(career);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = (req.params.id)
        const career = await Career.findByPk(id);
        res.status(200).json(career);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = (req.params.id)
        const career = await Career.findByPk(id);
        res.status(200).json(career);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error });
    }
})


module.exports = router