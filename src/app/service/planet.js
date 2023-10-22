const swapiGetPlanetById = require('../swapiFunctions/planet');
const db = require('../db');
const { Planet } = require("../../app/Planet");

const getPlanetById = async (id)=>{
    let swPlanet = await db.swPlanet.findOne({where: {id: id}});
    if (!swPlanet) {
        const planet = await swapiGetPlanetById(id)
        swPlanet = new Planet({...planet, id: id, gravity:parseFloat(planet.gravity.split(" ")[0])})
        await db.swPlanet.create({
            "id": id,
            "name": swPlanet.name,
            "gravity": swPlanet.gravity,
        })
    }
    else{
        swPlanet = new Planet(swPlanet);
    }
    return swPlanet;
}

module.exports = getPlanetById;