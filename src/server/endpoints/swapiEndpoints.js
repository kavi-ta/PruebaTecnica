// service imports
const {getPeopleById, getWeightOnPlanet} = require("../../app/service/people")
const getPlanetById = require("../../app/service/planet")

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
        try{
            const {id} = req.params;
            const swPerson = await getPeopleById(parseInt(id));
            res.send(swPerson);
        }
        catch (e){
            return res.status(404).send({
                message: e.message
            });
        }
        
    });

    server.get('/hfswapi/getPlanet/:id', async (req, res) => {
        try{
            const {id} = req.params;
            const swPlanet = await getPlanetById(parseInt(id));
            res.send(swPlanet);
        }
        catch (e){
            return res.status(404).send({
                message: e.message
            });
        }
    });

    server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
        try{
            const weight = await getWeightOnPlanet();
            res.send({"weight": weight});
        }
        catch (e){
            return res.status(400).send({
                message: e.message
            })
        }
        
    });

    server.get('/hfswapi/getLogs',async (req, res) => {
        const data = await app.db.logging.findAll();
        res.send(data);
    });

}

module.exports = applySwapiEndpoints;