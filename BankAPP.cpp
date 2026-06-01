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
    cout <<"\nCustomer: " << c1.getFirstName() <<""<< c1.getLastName()<< endl;

    cout << "\n[Main menu will go here]" << endl;

    return 0;
}