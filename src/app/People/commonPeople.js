const AbstractPeople = require('./abstractPeople');

class CommonPeople extends AbstractPeople {
    // constructor(id){
    //     super(id);
    //     this.id = id;
    // }

    constructor(data){
        super(data.id);
        this.name = data.name;
        this.mass = data.mass;
        this.height = data.height;
        this.homeworldName = data.homeworld_name;
        this.homeworldId = data.homeworld_id;
    }

}

module.exports = CommonPeople;