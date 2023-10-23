const AbstractPeople = require('./abstractPeople');

class CommonPeople extends AbstractPeople {
    // constructor(id){
    //     super(id);
    //     this.id = id;
    // }

    constructor(data){
        super(data.id);
        this.name = data.name;
        this.mass = parseFloat(data.mass);
        this.height = parseFloat(data.height);
        this.homeworld_name = data.homeworld_name;
        this.homeworld_id = data.homeworld_id;
    }

}

module.exports = CommonPeople;