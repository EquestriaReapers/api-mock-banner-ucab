const router = require('express').Router();
const { Role } = require('../../models/models');

router.get('/', async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.status(200).json(roles);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = (req.params.id);
        const role = await Role.findByPk(id);
        res.status(200).json(role);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error });
    }
});

router.post('/', async (req, res) => {
    try {
        const role = await Role.create(req.body);
        res.status(200).json(role);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = (req.params.id)
        const role = await Role.findByPk(id);
        res.status(200).json(role);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = (req.params.id)
        const role = await Role.findByPk(id);
        res.status(200).json(role);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error });
    }
})

module.exports = router