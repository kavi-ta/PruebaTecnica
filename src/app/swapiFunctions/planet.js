const swapiFunctions = require('../swapiFunctions');

const swapiGetPlanetById = async(id)=>{
    const planet = await swapiFunctions.genericRequest(`https://swapi.dev/api/planets/${id}`, 'GET', null, true);
    return planet;
}

module.exports = swapiGetPlanetById;