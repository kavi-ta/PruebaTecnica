const  WookieeEncodings  = require('../utils/wookie');
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

    getWookieeData() {
        let fields = {
            "id": this.id,
            "name": this.name,
            "gravity": this.gravity,
        }
        let data = {}
        for(const [key, value] of Object.entries(fields)){
            data[this.encode(key)] = this.encode(value)
        }
        return data;
    }

    encode(data){
        if (typeof data === 'string' || data instanceof String){
            let encodedString = data.split('').map( char => WookieeEncodings(char)).join("");
            return encodedString;
        }
        return data;
    }

    getName() {
        return this.name;
    }

    getGravity() {
        return this.gravity;
    }
}

module.exports = Planet;