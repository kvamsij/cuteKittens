const createResponseHandler = (res) => {
    const httpResponseObject = {
        statusCode: 200,
        message: "Kitten added successfully!!!",
        data: Object.assign(res, { isCreated : true })
    }
    if(typeof res !== 'object'){

        httpResponseObject.statusCode = 400,
        httpResponseObject.message = "either name or age is empty",
        httpResponseObject.data = Object.assign(res, { isCreated : false })
    }
    return httpResponseObject;
}


const getKittenByIdResponseHandler = (response, id) => {
    const httpResponseObject = Object.assign({}, {
        statusCode: 200,
        message: null,
        data: response
    });
    if(!response){
        httpResponseObject.statusCode = 404;
        httpResponseObject.message = `Kitten with given id ${id} not found`;
        httpResponseObject.data = {};
    }
    return httpResponseObject;
}

const updateResponseHandler = (res, id, body) => {
    const httpResponseObject = Object.assign({}, {
        statusCode: 404,
        message: `Kitten with given id ${id} not found`,
        data: Object.assign({}, {id, isUpdated: false})
    })
    if(res[0] > 0){
        httpResponseObject.statusCode = 200;
        httpResponseObject.message = `Kitten details updated sucessfully`,
        httpResponseObject.data = Object.assign({}, {...body, id, isUpdated: true})
    }
    return httpResponseObject;
 }

const deleteResponseHandler = (res, id) => {
    const httpResponseObject = Object.assign({}, {
        statusCode: 404,
        message: `Kitten with given id ${id} not found`,
        data: {
            id,
            isDeleted: false
        }
    });

    if(res > 0){
        httpResponseObject.statusCode = 200;
        httpResponseObject.message = `Kitten with given id ${id} is deleted successfully`;
        httpResponseObject.data = {
            id, isDeleted: true
        };
    }
    return httpResponseObject;
}


module.exports = {
    createResponseHandler,
    getKittenByIdResponseHandler,
    updateResponseHandler,
    deleteResponseHandler
}