const swapiFunctions = require('../swapiFunctions');
class Planet {
    // constructor(id){
    //     this.id = id;
    // }

    constructor(data){
        this.id = data.id;
        this.name = data.name;
        this.gravity = data.gravity;
    }

    async init(){
    }

    getName() {
        return this.name;
    }

    getGravity() {
        return this.gravity;
    }
}

module.exports = Planet;