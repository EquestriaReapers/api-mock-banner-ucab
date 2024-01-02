const router = require('express').Router();
const { Student, Career, Role } = require('../../models/models');

router.get('/', async (req, res) => {
    try {
        let {page = 0, limit = 10} = req.query;
        const [pageAsNumber, sizeAsNumber] = [Number.parseInt(page), Number.parseInt(size)];

        options = {
            limit: sizeAsNumber,
            
            include: [
                {
                    model: Career,
                    through: { attributes: [] }
                },
                {
                    model: Role,
                    through: { attributes: [] } 
                }
            ]
        }
        const students = await Student.findAll({
            include: [
                {
                    model: Career,
                    through: { attributes: [] }
                },
                {
                    model: Role,
                    through: { attributes: [] } 
                }
            ]
        });
        res.json(students);
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.get('/:documentNumber', async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.documentNumber, {
            include: [
                {
                    model: Career,
                    through: { attributes: [] }
                },
                {
                    model: Role,
                    through: { attributes: [] } 
                }
            ]
        });
        res.json(student);
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.post('/', async (req, res) => {
    try {
        const { documentNumber, name, lastName, email, birthdate, numberPhone, address } = req.body;
        const student = await Student.create({
            documentNumber,
            name,
            lastName,
            email,
            birthdate,
            numberPhone,
            address
        });
        res.json(student);
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.put('/:documentNumber', async (req, res) => {
    try {

        const verifyStudent = await Student.findByPk(req.params.documentNumber);

        if (!verifyStudent) {
            res.status(404).json({ error: 'Student not found' });
        }

        const { documentNumber, name, lastName, email, birthdate, numberPhone, address } = req.body;
        const student = await Student.update({
            name,
            lastName,
            email,
            birthdate,
            numberPhone,
            addresss
        }, {
            where: {
                documentNumber: req.params.documentNumber
            }
        });
        res.json(student);
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.delete('/:documentNumber', async (req, res) => {
    try {
        const verifyStudent = await Student.findByPk(req.params.documentNumber);

        if (!verifyStudent) {
            res.status(404).json({ error: 'Student not found' });
        }

        const student = await Student.destroy({
            where: {
                documentNumber: req.params.documentNumber
            }
        });
        res.json(student);
    } catch (error) {
        res.status(500).json({ error });
    }
});



module.exports = router;