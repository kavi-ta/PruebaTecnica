
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
        const {id} = req.params
        // fetch person by id from db
        let person = await app.db.swPeople.findOne({where: {id:id}})
        if(!person){
            // if person doesnt exist in db, get it from the swapi.dev
            person = await app.swapiFunctions.genericRequest(`https://swapi.dev/api/people/${id}`, 'GET', null, true);
            // fetch the planet of the person from swapi.dev
            const planet = await app.swapiFunctions.genericRequest(person.homeworld, 'GET', null, true)
            // check if planet exists in db
            let homeworldPlanet = await app.db.swPlanet.findOne({where : {name: planet.name}})
            if(!homeworldPlanet){
                // if planet doesnt exist in db, add it to db
                await app.db.swPlanet.create({
                    name: planet.name,
                    gravity: parseInt(planet.gravity.split(" ")[0])
                })
                homeworldPlanet = await app.db.swPlanet.findOne({where : {name: planet.name}})
            }
            // add the person to db
            await app.db.swPeople.create({
                name: person.name,
                mass: person.mass,
                height: person.height,
                homeworld_name: homeworldPlanet.name,
                homeworld_id: `/planets/${homeworldPlanet.id}`,
            })

            person = await app.db.swPeople.findOne({where: {id:id}})
        }
        res.send({
            "name": person?.name,
            "mass": person?.mass,
            "height":person?.height,
            "homeworldName": person?.homeworld_name,
            "homeworldId": person?.homeworld_id
        })
        
    });

    server.get('/hfswapi/getPlanet/:id', async (req, res) => {
        const {id} = req.params
        // fetch planet from db
        let planet = await app.db.swPlanet.findOne({where : {id: id}})
        
        if(!planet){
            const planetData = await app.swapiFunctions.genericRequest(`${swGenericApi}/planets/${id}`, 'GET', null, true)
            await app.db.swPlanet.create({
                name: planetData.name,
                gravity: parseInt(planetData.gravity.split(" ")[0])
            })
            planet = await app.db.swPlanet.findOne({where : {name: planetData.name}})
        }

        res.send({
            "name": planet.name,
            "gravity": planet.gravity
        });
    });

    server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
        const randomPeopleId = 1
        const randomPlanetId = 5
        const randomPeople = await app.db.swPeople.findOne({where: {id:randomPeopleId}})
        if(!randomPeople){
            data = await app.swapiFunctions.genericRequest(`https://swapi.dev/api/people/${randomPeopleId}`, 'GET', null, true);
            const planet = await app.swapiFunctions.genericRequest(data.homeworld, 'GET', null, true)
            let homeworldPlanet = await app.db.swPlanet.findOne({where : {name: planet.name}})
            if(!homeworldPlanet){

                await app.db.swPlanet.create({
                    name: planet.name,
                    gravity: parseInt(planet.gravity.split(" ")[0])
                })
                homeworldPlanet = await app.db.swPlanet.findOne({where : {name: planet.name}})
            }
            await app.db.swPeople.create({
                name: data.name,
                mass: data.mass,
                height: data.height,
                homeworld_name: homeworldPlanet.name,
                homeworld_id: `/planets/${homeworldPlanet.id}`,
            })

            data = await app.db.swPeople.findOne({where: {id:id}})
        }

        let randomPlanet = await app.db.swPlanet.findOne({where: {id:randomPlanetId}})
        if(!randomPlanet){
            const planet = await app.swapiFunctions.genericRequest(`${swGenericApi}/planets/${randomPlanetId}`, 'GET', null, true)
            await app.db.swPlanet.create({
                name: planet.name,
                gravity: parseInt(planet.gravity.split(" ")[0])
            })
            randomPlanet = await app.db.swPlanet.findOne({where : {name: planet.name}})
        }


        res.send({"weight": randomPeople.mass * randomPlanet.gravity});
    });

    server.get('/hfswapi/getLogs',async (req, res) => {
        const data = await app.db.logging.findAll();
        res.send(data);
    });

}

module.exports = applySwapiEndpoints;