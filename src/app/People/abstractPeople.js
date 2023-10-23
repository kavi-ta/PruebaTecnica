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
            // throw a typeError to indicate the gravity is null
            throw new TypeError(`${planet.name} Planet Gravity is not defined`);
        }
        if (planet.name === this.homeworld_name){
            // throws error if the random planet is same as the homeworld planet
            throw new Error("Planet random is same as the homeworld planet")
        }
        return getWeightOnPlanet(this.mass, planet.gravity);
        
    }
}

module.exports = AbstractPeople;