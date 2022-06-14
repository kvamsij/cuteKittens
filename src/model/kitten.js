const {Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../dbconfig/database');

const Model = Sequelize.Model;
const isTestEnv = process.env.NODE_ENV === 'test';
class Kitten extends Model {}

Kitten.init({
    name: {
        type: DataTypes.STRING
    },
    
    age: {
        type: DataTypes.NUMBER
    },
    id: {
        type: DataTypes.UUID,
        defaultValue: isTestEnv ? '0c85aea6-97f1-4b90-8ea8-901603cea32a' : DataTypes.UUIDV4,
        primaryKey: true
    }
},{
    sequelize, 
    modelName: 'Kitten'
});

module.exports = Kitten;