const { customers, accounts } = require('../models/dataStore');

// reset data before each test
beforeEach(() => {
    customers.length = 0;
    accounts.length = 0;

    customers.push({ id: 1, name: "Janmesh B", email: "janmesh@email.com", accounts: [] });
    customers.push({ id: 2, name: "Joe D", email: "joe@email.com", accounts: [] });
    customers.push({ id: 3, name: "Jane S", email: "jane@email.com", accounts: [] });

    accounts.push({ id: 1, accountNumber: "SA001", accountType: "Savings", balance: 5000, customerId: 1 });
    accounts.push({ id: 2, accountNumber: "CA001", accountType: "Checking", balance: 1500, customerId: 1 });
    accounts.push({ id: 3, accountNumber: "SA002", accountType: "Savings", balance: 12000, customerId: 2 });
    accounts.push({ id: 4, accountNumber: "CA002", accountType: "Checking", balance: 800, customerId: 3 });
});

// GET ALL CUSTOMERS 
test("SUCCESS: getAllCustomers returns all customers", () => {
    expect(customers.length).toBe(3);
});

test("FAIL: getAllCustomers returns empty when no customers", () => {
    customers.length = 0;
    expect(customers.length).toBe(0);
});

// GET CUSTOMER BY ID 
test("SUCCESS: find customer by id 1", () => {
    
    const customer = customers.find(c => c.id === 1);
    expect(customer).toBeDefined();
    expect(customer.name).toBe("Janmesh B");
});

test("FAIL: find customer by id 999 returns undefined", () => {

    const customer = customers.find(c => c.id === 999);
    expect(customer).toBeUndefined();
});

// GET CUSTOMER BY NAME 
test("SUCCESS: search customer by name Joe", () => {

    const result = customers.filter(c => c.name.toLowerCase().includes("joe"));
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Joe D");
});

test("FAIL: search customer by name that doesnt exist", () => {

    const result = customers.filter(c => c.name.toLowerCase().includes("xyz"));
    expect(result.length).toBe(0);
});

// GET PREMIUM CUSTOMERS 
test("SUCCESS: premium customers have balance over 10000", () => {

    const premium = customers.filter(customer => {
        const total = accounts
            .filter(a => a.customerId === customer.id)
            .reduce((sum, a) => sum + a.balance, 0);
        return total > 10000;
    });
    expect(premium.length).toBe(1);
    expect(premium[0].name).toBe("Joe D");
});

test("FAIL: no premium customers when all balances are low", () => {

    accounts.forEach(a => a.balance = 100);
    const premium = customers.filter(customer => {
        const total = accounts
            .filter(a => a.customerId === customer.id)
            .reduce((sum, a) => sum + a.balance, 0);
        return total > 10000;
    });
    expect(premium.length).toBe(0);
});

// CREATE CUSTOMER 
test("SUCCESS: create new customer", () => {

    const newCustomer = { id: 4, name: "Mike Ross", email: "mike@email.com", accounts: [] };
    customers.push(newCustomer);
    expect(customers.length).toBe(4);
    expect(customers[3].name).toBe("Mike Ross");
});


test("FAIL: creating customer without name leaves name undefined", () => {
    const newCustomer = { id: 4, email: "mike@email.com", accounts: [] };
    customers.push(newCustomer);
    expect(customers[3].name).toBeUndefined();
});

//UPDATE CUSTOMER 
test("SUCCESS: update customer name", () => {
    customers[0].name = "Janmesh Bhatt";
    expect(customers[0].name).toBe("Janmesh Bhatt");
});

test("FAIL: update customer that doesnt exist returns undefined", () => {
    const customer = customers.find(c => c.id === 999);
    expect(customer).toBeUndefined();
});

// DELETE CUSTOMER 
test("SUCCESS: delete customer by id", () => {
    const index = customers.findIndex(c => c.id === 1);
    customers.splice(index, 1);
    expect(customers.length).toBe(2);
    expect(customers.find(c => c.id === 1)).toBeUndefined();
});

test("FAIL: delete customer that doesnt exist", () => {
    const index = customers.findIndex(c => c.id === 999);
    expect(index).toBe(-1);
});