const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/dbconfig/database');
const KittenModel = require('../src/model/kitten');



beforeAll(() => {
    return sequelize.sync();
});

beforeEach(() => {
    return KittenModel.create({
        name: 'kitten1',
        age: 4,
        id: '0c85aea6-97f1-4b90-8ea8-901603cea32a'
    });
});

afterEach(() => {
    return KittenModel.destroy({truncate: true});
});

describe('Update Kitten', () => {
    
    const payload = {
        name: 'kitten100',
        age: 4,
    };

    const updateKittenRequest = async (id) => {
        return request(app).put(`/api/1.0/kittens/${id}`).send(payload);       
    }
       
    it('returns 200 OK when kitten details are updated', async () => {
        const kittensList = await KittenModel.findAll();
        const {id} = kittensList[0].toJSON();
        const response = await updateKittenRequest(id);
        expect(response.status).toBe(200);
    });
    
    it('returned response data to be equal to payload', async () => {
        const kittensList = await KittenModel.findAll();
        const {id} = kittensList[0].toJSON();
        const response = await updateKittenRequest(id);
        const expectedData = Object.assign({}, {...payload, id, isUpdated: true});
        expect(response.body.data).toMatchObject(expectedData);
    });

    it('should return 404 if id not found or invalid', async () => {
        const response = await updateKittenRequest('test');
        const {status} = response;
        expect(status).toBe(404);
    });

    it('should return message if id not found or invalid', async () => {
        const response = await updateKittenRequest('test');
        const {body} = response;
        expect(body.message).toBe(`Kitten with given id test not found`);
    });
    
});