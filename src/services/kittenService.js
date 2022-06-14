const KittenModel = require('../model/kitten');


const addKitten = async (body) => {
   const response =  await KittenModel.create(body);
   return response.toJSON();
}

const getKittens = async () => {
  const response = await KittenModel.findAll();
  return response;
}

const getKittenById = async (id) => {
  const response = await KittenModel.findByPk(id);
  return response;
}

const updateKitten = async (id, body) => {
  const condition = { where : {id} }
  const response = await KittenModel.update(body, condition);
  return response;
}

const removeKitten = async (id) => {
  const condition = { where : { id } };
  const response = await KittenModel.destroy(condition);
  return response;
}

module.exports = {
    addKitten,
    getKittens,
    getKittenById,
    updateKitten,
    removeKitten
}