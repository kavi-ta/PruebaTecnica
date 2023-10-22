const fetch = require('node-fetch');

const getWeightOnPlanet = (mass, gravity) => {
    return mass * gravity;
}

const genericRequest = async (url, method, body, logging = false) => {
    let options = {
        method: method
    }
    if(body){
        options.body = body;
    }
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.status===404){
        // incase an invalid id is passed, throw an error
        throw new Error("Details not found");
    }
    
    if(logging){
        console.log(data);
    }
    return data;
}

module.exports = {
    getWeightOnPlanet,
    genericRequest
}