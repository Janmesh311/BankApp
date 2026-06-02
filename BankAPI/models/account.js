class Account{
    constructor(id, accountNumber, accountType, balance, customerId){
        this.id = id;
        this.accountNumber = accountNumber;
        this.accountType = accountType;
        this.balance = balance;
        this.customerId = customerId; 
    }
}

module.exports = Account; 