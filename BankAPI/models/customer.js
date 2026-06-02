class Customer{
    constructor(id, name, email){
        this.id=id;
        this.name = name;
        this.email = email;
        this.accounts =[] // coustomer can have mulitple acc
    }
}

module.exports = Customer; 