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


describe('GetAll Kittens', () => {
    
    const getAllKittensRequest = async () => {
        return request(app).get(`/api/1.0/kittens`);       
    }

    it('returns 200 OK when fetching all kittens', async () => {
        const response = await getAllKittensRequest();
        expect(response.status).toBe(200);

    });

    it('should returns same response body length', async () => {

        const response = await getAllKittensRequest();
        const kittensList = await KittenModel.findAll();
        expect(response.body.length).toBe(kittensList.length);
        
    });
    
    it('should match returned response', async () => {
        
        const response = await getAllKittensRequest();
        const kittensList = await KittenModel.findAll();
        const expectedData = kittensList.map((kitten) => {
            const expectedKitten = kitten.toJSON();
            delete expectedKitten.createdAt;
            delete expectedKitten.updatedAt;
            return expectedKitten;
        });
        expect(response.body).toMatchObject(expectedData);

    });

    // it('should return empty array when no data exists', async () => {
        
    //     const response = await getAllKittensRequest();
    //     expect(response.body.length).toBe(0);

    // });
   
});