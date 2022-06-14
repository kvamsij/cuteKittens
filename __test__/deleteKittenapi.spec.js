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


describe('Delete Kitten', () => {
    
    
    const deleteKittenRequest = async (id) => {
        return request(app).delete(`/api/1.0/kittens/${id}`);       
    }

    it('returns 200 OK when kitten is deleted', async () => {

        const kittensList = await KittenModel.findAll();
        const {id} = kittensList[0].toJSON();
        const response = await deleteKittenRequest(id);
        expect(response.status).toBe(200);

    });
    
    it('should return 404 if id not found or invalid', async () => {

        const response = await deleteKittenRequest('test');
        const {status} = response;
        expect(status).toBe(404);

    });

    it('should return message "Kitten with given id=test not found" if statusCode is 404', async () => {

        const response = await deleteKittenRequest('test');
        const {body} = response;
        expect(body.message).toBe(`Kitten with given id test not found`);

    });
    
    it(`returned response data to be equal to {id: string, isDeleted: false}`, async () => {

        const response = await deleteKittenRequest('test');
        expect(response.body.data).toMatchObject({id: 'test', isDeleted: false});

    });

    it('should return message "Kitten with given id ${id} is deleted successfully" if successfully deleted', async () => {

        const kittensList = await KittenModel.findAll();
        const {id} = kittensList[0].toJSON();
        const response = await deleteKittenRequest(id);
        const {body} = response;
        expect(body.message).toBe(`Kitten with given id ${id} is deleted successfully`);
    });


    it(`returned response data to be equal to {id: string, isDeleted: true}`, async () => {

        const kittensList = await KittenModel.findAll();
        const {id} = kittensList[0].toJSON();
        const response = await deleteKittenRequest(id);
        expect(response.body.data).toMatchObject({id: id, isDeleted: true});

    });

    it('should return zero records after deletion', async () => {
        let kittensList = await KittenModel.findAll();
        const {id} = kittensList[0].toJSON();
        const response = await deleteKittenRequest(id);
        kittensList = await KittenModel.findAll();
        expect(kittensList.length).toBe(0);
    });
    
});