const swapiGetPeopleById = require('../swapiFunctions/people');
const db = require('../db');
const { swPeopleFactoryWithData } = require("../../app/People");
const getPlanetById = require('./planet');

const getPeopleById = async (id)=>{
    let swPerson = await db.swPeople.findOne({where: {id: id}});
    if (!swPerson){
        const person = await swapiGetPeopleById(id);
        let homeworldPlanetId = person.homeworld.split("/")[5];
        let homeworldPlanet = await db.swPlanet.findOne({where : {id: homeworldPlanetId}});
        if (!homeworldPlanet) {
            homeworldPlanet = await getPlanetById(homeworldPlanetId);
        }
        swPerson = await swPeopleFactoryWithData({...person, id: id, homeworld_name: homeworldPlanet.name, homeworld_id: `/planets/${homeworldPlanet.id}`  })
        await db.swPeople.create({
            "id": id,
            "name": swPerson.name,
            "height": swPerson.height,
            "mass": swPerson.mass,
            "homeworld_id": swPerson.homeworldId,
            "homeworld_name": swPerson.homeworldName
        })
    }
    else{
        swPerson = await swPeopleFactoryWithData(swPerson);
    }
    return swPerson
}

module.exports = getPeopleById;