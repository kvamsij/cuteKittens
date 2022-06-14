const express = require('express');
const router = express.Router();
const kittensService = require('../services/kittenService');
const {createResponseHandler, getKittenByIdResponseHandler, updateResponseHandler, deleteResponseHandler} = require('../services/httpResponseService');

router.post('/api/1.0/kittens', async (req, res) => {
    if(!req.body.name || !req.body.age) {
    const {statusCode, message, data} = createResponseHandler(0);
    return res.status(statusCode).send({message, data});    
    }
    const response = await kittensService.addKitten(req.body);
    const {statusCode, message, data} = createResponseHandler(response);
    return res.status(statusCode).send({message, data});    
});

router.get('/api/1.0/kittens', async (req, res) => {
    const kittens = await kittensService.getKittens();
    return res.send(kittens);
});

router.put('/api/1.0/kittens/:id', async (req, res) => {
    const {id} = req.params;
    const response = await kittensService.updateKitten(id, req.body);
    const {statusCode, message, data} = updateResponseHandler(response, id, req.body);
    return res.status(statusCode).send({message, data});
});

router.delete('/api/1.0/kittens/:id', async(req, res) => {
    const {id} = req.params;
    const response = await kittensService.removeKitten(id);
    const {statusCode, message, data} = deleteResponseHandler(response, id);
    return res.status(statusCode).send({message, data});
})

router.get('/api/1.0/kittens/:id', async (req, res) => {
    const { id } = req.params;
    const response = await kittensService.getKittenById(id);
    const {statusCode, message, data} = getKittenByIdResponseHandler(response, id);
    return res.status(statusCode).send({message, data});
});




module.exports = router;