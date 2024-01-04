const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection');

const Student = sequelize.define('Student', {
    documentNumber: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { msg: "Email invalido" }
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    numberPhone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, { tableName: 'students' });

const Career = sequelize.define('Career', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, { tableName: 'careers' });

const Role = sequelize.define('Role', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, { tableName: 'roles' });

const RoleStudent = sequelize.define('RoleStudent', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, { tableName: 'role_students' });

const StudentCareer = sequelize.define('StudentCareer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dateInit: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dateGraduated: {
        type: DataTypes.DATE,
        allowNull: true
    },
    isGraduated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, { tableName: 'student_careers' });


Student.belongsToMany(Career, { through: StudentCareer });
Career.belongsToMany(Student, { through: StudentCareer });
Student.hasMany(StudentCareer);
StudentCareer.belongsTo(Student);
Career.hasMany(StudentCareer);
StudentCareer.belongsTo(Career);
Student.belongsToMany(Role, { through: RoleStudent });
Role.belongsToMany(Student, { through: RoleStudent });
Student.hasMany(RoleStudent);
RoleStudent.belongsTo(Student);
Role.hasMany(RoleStudent);
RoleStudent.belongsTo(Role);

console.log("All models were synchronized successfully.");

module.exports = {
    Student,
    Career,
    Role,
    RoleStudent,
    StudentCareer
};