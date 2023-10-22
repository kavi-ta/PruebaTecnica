const swapiFunctions = require('../swapiFunctions');

const swapiGetPeopleById = async (id) => {
    try{
        // fetch the people details using id from the swapi;
        const people = await swapiFunctions.genericRequest(`https://swapi.dev/api/people/${id}`, 'GET', null, true);
        return people;
    }
    catch (e){
        throw e;
    }
}

const swapiGetPeopleCount = async () => {
    // fetch the max number of people from the swapi;
    const people = await swapiFunctions.genericRequest(`https://swapi.dev/api/people`, 'GET', null, true);
    return people.count;
}
module.exports = { swapiGetPeopleById, swapiGetPeopleCount};