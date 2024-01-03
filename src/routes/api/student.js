const router = require('express').Router();
const { Student, Career, Role, StudentCareer } = require('../../models/models');

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

router.get('/ci/:documentNumber', async (req, res) => {
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

router.get('/email/:email' , async (req, res) => {
    try {
        const email = (req.params.email);
        const student = await Student.findOne({
            where: {
                email
            },
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
        res.status(500).json({
            error: error.message
        })
    }
})

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

router.post('/set-career/:documentNumber/:careerId', async (req, res) => {
    try {
        const { documentNumber, careerId } = req.params;
        const { dateInit, dateGraduated, isGraduated } = req.body;
        let student = await Student.findByPk(documentNumber, {
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
        const career = await Career.findByPk(careerId);

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        if (!career) {
            return res.status(404).json({ error: 'Career not found' });
        }

        const careerIds = student.Careers.map(career => career.id);

        if (careerIds.includes(career.id)) {
            return res.status(400).json({ error: 'Student already has a career' });
        }

        if (dateInit === undefined || dateInit === null || dateInit === '') {
            return res.status(400).json({ error: 'dateInit is required' });
        }

        if (dateGraduated === '') {
            return res.status(400).json({ error: 'dateGraduated format not accept' });
        }

        if (isGraduated === '') {
            return res.status(400).json({ error: 'isGraduated format not accept' });
        }

        const newCareerStudent = await StudentCareer.create({
            dateInit,
            dateGraduated,
            isGraduated,
            StudentDocumentNumber: documentNumber,
            CareerId: careerId
        });
        
        res.status(200).json(newCareerStudent);
    } catch (error) {
        console.log(error)
        if (error.message === 'Student not found') {
            res.status(404).json({ error: error.message });
        } else {
            if (error.message === 'Career not found') {
                res.status(404).json({ error: error.message });
            } else {
                if (error.message === 'Student already has a career') {
                    res.status(400).json({ error: error.message });
                }
            }
        }
        res.status(500).json({ error: error.message });
    }
});

router.post('/set-role/:documentNumber/:roleId', async (req, res) => {
    try {
        const { documentNumber, roleId } = req.params;
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
        const role = await Role.findByPk(roleId);

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }

        const roleIds = student.Roles.map(role => role.id);

        if (roleIds.includes(role.id)) {
            return res.status(400).json({ error: 'Student already has a role' });
        }

        await student.addRole(role);
        res.status(200).json(student);
    } catch (error) {
        console.log(error)
        if (error.message === 'Student not found') {
            res.status(404).json({ error: error.message });
        } else {
            if (error.message === 'Role not found') {
                res.status(404).json({ error: error.message });
            } else {
                if (error.message === 'Student already has a role') {
                    res.status(400).json({ error: error.message });
                }
            }
        }
        res.status(500).json({ error: error.message});
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