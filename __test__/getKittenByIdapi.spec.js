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


describe('Get Kittens By Id', () => {
    
    const getKittenByIdRequest = async (id) => {
        return request(app).get(`/api/1.0/kittens/${id}`);       
    }

    it('returns 200 OK when fetching kittens by id', async () => {
        const kittensList = await KittenModel.findAll();
        const {id} = kittensList[0].toJSON();
        const response = await getKittenByIdRequest(id);
        expect(response.status).toBe(200);
    });

    it('returns 404 when kitten id not found', async () => {
        const response = await getKittenByIdRequest('test');
        expect(response.status).toBe(404);
    });
    
    it('should match returned response', async () => {
        
        const kittensList = await KittenModel.findAll();
        const {id} = kittensList[0].toJSON();
        const response = await getKittenByIdRequest(id);
        const expectedData = kittensList.map((kitten) => {
            const expectedKitten = kitten.toJSON();
            delete expectedKitten.createdAt;
            delete expectedKitten.updatedAt;
            return expectedKitten;
        });
        expect(response.body.data).toMatchObject(expectedData[0]);

    });
    
   
});