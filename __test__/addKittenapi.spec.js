const request = require('supertest');
const { v4: uuidv4 } = require('uuid');
const app = require('../src/app');
const KittenModel = require('../src/model/kitten')
const sequelize = require('../src/dbconfig/database');


let kittensList = null;
beforeAll(() => {
    return sequelize.sync();
});

beforeEach(() => {
    return KittenModel.destroy({truncate: true})
});

describe('Add Kitten',  () => {

    const payload = {
        name: 'kitten1',
        age: 4,
    };
    const postKittenRequest = async (payload) => {
        return request(app).post('/api/1.0/kittens').send(payload);       
    }
    
    it('returns 200 OK when kitten details are added', async () => {
        const response = await postKittenRequest(payload);
        expect(response.status).toBe(200);
    });
    it('returns 400 when payload is empty', async () => {
        const response = await postKittenRequest({});
        expect(response.status).toBe(400);
    });
    
    it('returns success message when kitten added', async () => {
        const response = await postKittenRequest(payload);
        expect(response.body.message).toBe('Kitten added successfully!!!');
    });

    it('should assign id', async () => {
        const response = await postKittenRequest(payload);
        expect(response.body.data).toHaveProperty('id');
    });

    it('saves kitten to database', async () => {
        await postKittenRequest(payload);
        const kittenList = await KittenModel.findAll();
        expect(kittenList.length).toBe(1);
    });

    it('saves name and age to database', async () => {
        await postKittenRequest(payload);
        const kittenList = await KittenModel.findAll();
        const {name, age} = kittenList[0];
        expect(name).toBe('kitten1');
        expect(age).toBe(4);    
    });

});
