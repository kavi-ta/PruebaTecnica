const swapiFunctions = require('../swapiFunctions');

const swapiGetPlanetById = async(id)=>{
    try{
        // fetch the planet details using id from the swapi;
        const planet = await swapiFunctions.genericRequest(`https://swapi.dev/api/planets/${id}`, 'GET', null, true);
        return planet;
    }
    catch(e){
        throw e;
    }
}

const swapiGetPlanetCount = async () => {
    try{
        // fetch the max number of planets from the swapi;
        const planet = await swapiFunctions.genericRequest(`https://swapi.dev/api/planets`, 'GET', null, true);
        return planet.count;
    }
    catch (e){
        throw e;
    }
    
}

module.exports = {swapiGetPlanetById, swapiGetPlanetCount};