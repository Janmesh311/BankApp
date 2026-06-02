#include <iostream>
#include <string>
using namespace std;


class Customer {
    private:
    int customerID;
    string firstName;
    string lastName;
    
    public:
    Customer(int id, string first, string last){
        customerID = id;
        firstName = first; 
        lastName = last; 
    }

    int gitID(){
        return customerID;
    }
    string getFirstName(){
        return firstName;
    }
    string getLastName(){
        return lastName; 
    }
};

// Account 
class Account{
    protected:
    string accountNumber;
    Customer* accountHolder;
    double balance;

    public:
    Account(string accNum, Customer* holder, double initialBalance) {
        accountNumber = accNum;
        accountHolder = holder;
        balance = initialBalance;
    }

    void deposit(double amount) {
        balance += amount;
        cout << "Deposited $" << amount << " | New Balance: $" << balance << endl;
    }

    virtual void withdraw(double amount) = 0; 

    string getAccountNumber() { 
        return accountNumber; 
    }
    double getBalance() { 
        return balance; 
    }
    string getHolderName()  {
         return accountHolder->getFirstName() + " " + accountHolder->getLastName(); 
        }

    virtual void printReceipt() {
        cout << "Account: " << accountNumber << " | Holder: " << getHolderName() << " | Balance: $" << balance << endl;
    }




};

class SavingsAccount : public Account {
    private:
    double interestRate;

    public:
    SavingsAccount(string accNum, Customer* holder, double initialBalance, double rate) : Account(accNum, holder, initialBalance) {
        interestRate = rate;
    }

    void withdraw(double amount) override {
        if (balance - amount < 100) {   // cant go below $100
            cout << "Denied. Savings account must keep $100 minimum balance." << endl;
        } else {
            balance -= amount;
            cout << "Withdrew $" << amount << " | New Balance: $" << balance << endl;
        }
    }

    void printReceipt() override {
        cout << "SAVINGS ACCOUNT" << endl;
        cout << "Account: " << accountNumber << endl;
        cout << "Holder: " << getHolderName() << endl;
        cout << "Balance: $" << balance << endl;
        cout << "Interest Rate: " << interestRate << "%" << endl;
    }


};

// Checking Account - can go negative up to overdraft limit
class CheckingAccount : public Account {
private:
    double overdraftLimit;

public:
    CheckingAccount(string accNum, Customer* holder, double initialBalance, double limit)
        : Account(accNum, holder, initialBalance) {
        overdraftLimit = limit;
    }

    void withdraw(double amount) override {
        if (balance - amount < -overdraftLimit) {   // cant exceed overdraft limit
            cout << "Denied. Exceeds overdraft limit of $" << overdraftLimit << endl;
        } else {
            balance -= amount;
            cout << "Withdrew $" << amount << " | New Balance: $" << balance << endl;
        }
    }

    void printReceipt() override {
        cout << "=== CHECKING ACCOUNT ===" << endl;
        cout << "Account: " << accountNumber << endl;
        cout << "Holder: " << getHolderName() << endl;
        cout << "Balance: $" << balance << endl;
        cout << "Overdraft Limit: $" << overdraftLimit << endl;
    }
};


void welcomeScreen() {

    cout << "WELCOME" << endl;
    
}

void login() {

    string username;
    string password;

    cout << "Enter Username: ";
    cin >> username;
    cout << "Enter Password: ";
    cin >> password;

    if (username == "admin" && password == "1234") {

        cout << "\nLogin successful! Welcome, " << username << endl;

    } 

    else{
        cout << "\nInvalid credentials. Exiting." << endl;
        exit(0);
    }
}

int main() {
    welcomeScreen();
    login();

    Customer c1(1, "Janmesh", "Bhatt");

    SavingsAccount sa("SA001", &c1, 500.0, 2.5);
    CheckingAccount ca("CA001", &c1, 300.0, 200.0);

    sa.printReceipt();
    sa.withdraw(450);   // should be denied - would go below $100
    sa.withdraw(200);   // should work

    cout << endl;

    ca.printReceipt();
    ca.withdraw(400);   // should work - within overdraft
    ca.withdraw(200);   // should be denied - exceeds overdraft

    return 0;
}