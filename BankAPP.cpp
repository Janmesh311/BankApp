#include <iostream>
#include <string>
#include <vector>
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

    // seed data
    vector<Customer> customers;
    customers.reserve(100);
    customers.push_back(Customer(1, "Janmesh", "Bhatt"));
    customers.push_back(Customer(2, "John", "Doe"));

    vector<Account*> accounts;
    accounts.push_back(new SavingsAccount("SA001", &customers[0], 500.0, 2.5));
    accounts.push_back(new CheckingAccount("CA001", &customers[1], 300.0, 200.0));

    int choice;

    while (true) {
        
        cout << "         BANK MENU            " << endl;
        cout << "1. Create Account" << endl;
        cout << "2. View All Accounts" << endl;
        cout << "3. Deposit" << endl;
        cout << "4. Withdraw" << endl;
        cout << "5. Transfer" << endl;
        cout << "6. Close Account" << endl;
        cout << "7. Exit" << endl;
        cout << "==============================" << endl;
        cout << "Enter choice: ";
        cin >> choice;

        switch (choice) {

            case 1: {
                // create account
                string first, last, accNum, type;
                double balance;
                cout << "First name: "; cin >> first;
                cout << "Last name: "; cin >> last;
                customers.push_back(Customer(customers.size() + 1, first, last));

                cout << "Account number: "; cin >> accNum;
                cout << "Type (Savings/Checking): "; cin >> type;
                cout << "Initial balance: "; cin >> balance;

                if (type == "Savings") {
                    accounts.push_back(new SavingsAccount(accNum, &customers.back(), balance, 2.5));
                } else {
                    accounts.push_back(new CheckingAccount(accNum, &customers.back(), balance, 200.0));
                }
                cout << "Account created!" << endl;
                break;
            }

            case 2: {
                // view all accounts
                cout << "\n--- ALL ACCOUNTS ---" << endl;
                for (Account* acc : accounts) {
                    acc->printReceipt();
                    cout << "-------------------" << endl;
                }
                break;
            }

            case 3: {
                // deposit
                string accNum;
                double amount;
                cout << "Enter account number: "; cin >> accNum;
                cout << "Enter amount: "; cin >> amount;

                bool found = false;
                for (Account* acc : accounts) {
                    if (acc->getAccountNumber() == accNum) {
                        acc->deposit(amount);
                        acc->printReceipt();
                        found = true;
                        break;
                    }
                }
                if (!found) cout << "Account not found." << endl;
                break;
            }

            case 4: {
                // withdraw
                string accNum;
                double amount;
                cout << "Enter account number: "; cin >> accNum;
                cout << "Enter amount: "; cin >> amount;

                bool found = false;
                for (Account* acc : accounts) {
                    if (acc->getAccountNumber() == accNum) {
                        acc->withdraw(amount);
                        acc->printReceipt();
                        found = true;
                        break;
                    }
                }
                if (!found) cout << "Account not found." << endl;
                break;
            }

            case 5: {
                // transfer
                string fromAcc, toAcc;
                double amount;
                cout << "From account number: "; cin >> fromAcc;
                cout << "To account number: "; cin >> toAcc;
                cout << "Amount: "; cin >> amount;

                Account* from = nullptr;
                Account* to = nullptr;

                for (Account* acc : accounts) {
                    if (acc->getAccountNumber() == fromAcc) from = acc;
                    if (acc->getAccountNumber() == toAcc) to = acc;
                }

                if (!from || !to) {
                    cout << "Account not found." << endl;
                } else {
                    from->withdraw(amount);
                    to->deposit(amount);
                    cout << "Transfer complete." << endl;
                }
                break;
            }

            case 6: {
                // close account
                string accNum;
                cout << "Enter account number to close: "; cin >> accNum;

                bool found = false;
                for (int i = 0; i < accounts.size(); i++) {
                    if (accounts[i]->getAccountNumber() == accNum) {
                        delete accounts[i];
                        accounts.erase(accounts.begin() + i);
                        cout << "Account closed." << endl;
                        found = true;
                        break;
                    }
                }
                if (!found) cout << "Account not found." << endl;
                break;
            }

            case 7:
                cout << "Goodbye!" << endl;
                return 0;

            default:
                cout << "Invalid option. Try again." << endl;
        }
    }
}