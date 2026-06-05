const Customer = require ('./customer');
const Account = require('./account');

const customers = [
    new Customer(1, "Janmesh B", "janmesh@email.com"),
    new Customer(2, "Joe D", "john@email.com"),
    new Customer(3, "Jane S", "jane@email.com")
];

const accounts = [
    new Account(1, "SA001", "Savings", 5000, 1),    
    new Account(2, "CA001", "Checking", 1500, 1),   
    new Account(3, "SA002", "Savings", 12000, 2),   
    new Account(4, "CA002", "Checking", 800, 3)
]; 

module.exports = { customers, accounts };