// service imports
const swapiGetPeopleById = require("../../app/service/people")
const swapiGetPlanetById = require("../../app/service/planet")

const _isWookieeFormat = (req) => {
    if(req.query.format && req.query.format == 'wookiee'){
        return true;
    }
    return false;
}


const applySwapiEndpoints = (server, app) => {

    const swGenericApi = 'https://swapi.dev/api'
    server.get('/hfswapi/test', async (req, res) => {
        const data = await app.swapiFunctions.genericRequest('https://swapi.dev/api/', 'GET', null, true);
        res.send(data);
    });

    server.get('/hfswapi/getPeople/:id', async (req, res) => {
        const {id} = req.params;
        const swPerson = await swapiGetPeopleById(parseInt(id));
        res.send(swPerson);
    });

    server.get('/hfswapi/getPlanet/:id', async (req, res) => {
        const {id} = req.params;
        const swPlanet = await swapiGetPlanetById(parseInt(id));
        res.send(swPlanet);
    });

    server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
        res.send({"message": "To be implemented"});
    });

    server.get('/hfswapi/getLogs',async (req, res) => {
        const data = await app.db.logging.findAll();
        res.send(data);
    });

}

module.exports = applySwapiEndpoints;