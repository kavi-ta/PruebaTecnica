// swapiFunctions import
const {swapiGetPeopleById, swapiGetPeopleCount} = require('../swapiFunctions/people');
const { swapiGetPlanetCount } = require('../swapiFunctions/planet');
// db import
const db = require('../db');
const { swPeopleFactoryWithData } = require("../../app/People");
// service import
const getPlanetById = require('./planet');


const getRandomId = (min,max) =>{
    const randomId = Math.floor(Math.random()*(max-min));
    return randomId;
}

let maxPlanetCount;
let maxPeopleCount;

const getPeopleById = async (id , lang=null)=>{
    try{
        // fetch the swPerson from db
        let swPerson = await db.swPeople.findOne({where: {id: id}});
        if (!swPerson){
            // fetch the swPerson from swapi since it was not found in db
            const person = await swapiGetPeopleById(id);
            let homeworldPlanetId = person.homeworld.split("/")[5];
            // fetch the homeworldPlanet
            homeworldPlanet = await getPlanetById(homeworldPlanetId);
            // create the swPerson object
            swPerson = await swPeopleFactoryWithData({...person, id: id, homeworld_name: homeworldPlanet.name, homeworld_id: `/planets/${homeworldPlanet.id}` } , lang=lang)
            // store swPerson in db
            await db.swPeople.create({
                "id": id,
                "name": swPerson.name,
                "height": swPerson.height,
                "mass": swPerson.mass,
                "homeworld_id": swPerson.homeworld_id,
                "homeworld_name": swPerson.homeworld_name
            })
        }
        else{
            // create the swPerson object
            swPerson = await swPeopleFactoryWithData(swPerson, lang = lang);
        }
        if (lang == 'wookiee'){
            swPerson = await swPerson.getWookieeData()
        }
        return swPerson;
    }
    catch (e){
        throw e;
    }
}

const getWeightOnPlanet = async () => {
    try{
        if (!maxPlanetCount) {
            // set the max planet count;
            maxPlanetCount = await swapiGetPlanetCount()+1;
        }
        if (!maxPeopleCount) {
            // set the max people count;
            maxPeopleCount = await swapiGetPeopleCount()+1;
        }
        // generate a random people and planet id
        let randomPeopleId = getRandomId( 0, maxPeopleCount);
        let randomPlanetId = getRandomId( 0, maxPlanetCount);
        let randomPerson = await getPeopleById(randomPeopleId);
        // if the person mass is not available, find another person with a valid mass;
        while(!randomPerson.mass){
            randomPeopleId = getRandomId( 0, maxPeopleCount);
            randomPerson = await getPeopleById(randomPeopleId)
        }
        let weight;
        // if the weight generated is null due to planet.gravity being null find another planet with a valid gravity;
        while (true) {
            try{
                weight = await randomPerson.getWeightOnPlanet(randomPlanetId);
                break;
            }
            catch (e){
                if(e instanceof TypeError){
                    randomPlanetId = getRandomId( 0, maxPlanetCount);
                }
                else{
                    throw (e)
                }
                
            }
        }
        return weight;
    }
    catch (e){
        throw e;
    }

}
module.exports = {getPeopleById, getWeightOnPlanet};