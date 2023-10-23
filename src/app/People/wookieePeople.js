const  WookieeEncodings  = require('../utils/wookie');
const AbstractPeople = require('./abstractPeople');

class WookieePeople extends AbstractPeople {
    constructor(data){
        super(data.id);
        this.name = data.name;
        this.mass = data.mass;
        this.height = data.height;
        this.homeworld_name = data.homeworld_name;
        this.homeworld_id = data.homeworld_id;
    }

    getWookieeData() {
        const fields = {
            "id": this.id,
            "name": this.name,
            "mass": this.mass,
            "height": this.height,
            "homeworld_name": this.homeworld_name,
            "homeworld_id": this.homeworld_id
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

}

module.exports = WookieePeople;