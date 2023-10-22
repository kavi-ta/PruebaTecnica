const swapiFunctions = require('../swapiFunctions');

const swapiGetPeopleById = async(id)=>{
    const people = await swapiFunctions.genericRequest(`https://swapi.dev/api/people/${id}`, 'GET', null, true);
    return people;
}

module.exports = swapiGetPeopleById;