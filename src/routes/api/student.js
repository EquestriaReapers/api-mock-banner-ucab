const router = require('express').Router();
const { Student, Career, Role } = require('../../models/models');

router.get('/', async (req, res) => {
    try {
        let {page = 0, limit = 10} = req.query;
        const [pageAsNumber, sizeAsNumber] = [Number.parseInt(page), Number.parseInt(limit)];

        options = {
            limit: sizeAsNumber,
            offset: pageAsNumber * sizeAsNumber,
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
        res.status(200).json(students);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});

router.get('/:documentNumber', async (req, res) => {
    try {
        const documentNumber = (req.params.documentNumber);
        const student = await Student.findByPk(documentNumber, {
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
        res.status(200).json(student);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error });
    }
});

router.post('/', async (req, res) => {
    try {
        const { documentNumber, name, lastname, email, birthdate, numberPhone, address } = req.body;
        const student = await Student.create({
            documentNumber,
            name,
            lastname,
            email,
            birthdate,
            numberPhone,
            address
        });
        res.status(200).json(student);
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

        const { documentNumber, name, lastname, email, birthdate, numberPhone, address } = req.body;
        const student = await Student.update({
            name,
            lastname,
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