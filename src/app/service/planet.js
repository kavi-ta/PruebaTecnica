// swapiFunction import
const {swapiGetPlanetById} = require('../swapiFunctions/planet');
// Planet class import
const { Planet } = require("../../app/Planet");
// db import
const db = require('../db');

const getPlanetById = async (id, lang=null)=>{
    try{
        // fetch swPlanet from db
        let swPlanet = await db.swPlanet.findOne({where: {id: id}});
        if (!swPlanet) {
            // fetch swPlanet from swapi since it was not found in db
            const planet = await swapiGetPlanetById(id)
            // create swPlanet an object of Planet class
            swPlanet = new Planet({...planet, id: id, gravity:parseFloat(planet.gravity.split(" ")[0])})
            // store the swPlanet in db
            await db.swPlanet.create({
                "id": id,
                "name": swPlanet.name,
                "gravity": swPlanet.gravity,
            })
        }
        else{
            // create swPlanet an object of Planet class
            swPlanet = new Planet(swPlanet);
        }
        if (lang == 'wookiee'){
            swPlanet = await swPlanet.getWookieeData()
        }
        return swPlanet;
    }
    catch (e){
        throw e;
    }
    
}

module.exports = getPlanetById;