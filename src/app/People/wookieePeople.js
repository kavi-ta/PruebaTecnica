const AbstractPeople = require('./abstractPeople');
class WookieePeople extends AbstractPeople {
    constructor(id){
        this.id = id;
    }
}

module.exports = WookieePeople;