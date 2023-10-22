const getPlanetById = require("../service/planet");
const { getWeightOnPlanet } = require("../swapiFunctions");

class AbstractPeople {

    constructor(id) {
        if (this.constructor == AbstractPeople) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.id = id;
    }

    async init(){
        return;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getMass() {
        return this.mass;
    }

    getHeight() {
        return this.height;
    }

    getHomeworldName() {
        return this.homeworld_name;
    }

    getHomeworldId() {
        return this.homeworld_id;
    }

    async getWeightOnPlanet(planetId){
        const planet = await getPlanetById(planetId);
        if (!planet.gravity){
            throw new Error(`${planet.name} Planet Gravity is no defined`);
        }
        return getWeightOnPlanet(this.mass, planet.gravity);
        
    }
}

module.exports = AbstractPeople;