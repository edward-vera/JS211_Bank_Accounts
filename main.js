'use strict';
class BankAccount {
    constructor(accountNumber, owner){
        this.accountNumber = accountNumber;
        this.owner = owner;
        this.transactions = []
    }


    balance() {
        let sum = 0;
        for(let i=0; i<this.transations.length; i++){
            sum = this.transactions[i].amount;
        }
        return sum;
    }

    charge(payee, amt){
        let currentBalance = this.balance();
        if (amt <= currentBalance){
            let chargeTransaction = new Transaction(-1*amt, payee);
            this.transactions.push(chargeTransaction);
        }
    }

    deposit(amt){
        if(amt <0){
            let depositTransaction = new Transaction(amt, this.owner);
            this.transactions.push(depositTransaction);
    }
}



}

class Transaction {
    constructor(amount, payee) {
        this.amount = amount;
        this.payee = payee;
        this.date = new Date();
    }
}


// TESTING ISNT WORKING//
// tests below
if (typeof describe === 'funtion') {

    describe("#testing account creation", function() {
        it('should create a new account correctly',function(){
            let acct1 = new BankAccount('xx4432', "James Doe");
            assert.equal(acct1.owner, 'James Doe');
            assert.equal(acct1.accountNumber, 'xx4432');
            assert.equal(acct1.transactions.length, 0);
            assert.equal(acct1.balance(), 0)
        });

    });

    describe("#testing account balance", function() {
        it('should create a new account correctly',function(){
            let acct1 = new BankAccount('xx4432', "James Doe");
            assert.equal(acct1.balance(), 0);
            acct1.deposit(100);
            assert.equal(acct1.balance(), 100);
            assert.charge("Target", 10);
            assert.equal(acct1.balance(), 90);
        });

        it('should not allow negative deposit', function () {
            let acct1 = new BankAccount('xx432', "James Doe");
            assert.equal(acct1.balance(), 0);
            assert.deposit(100);
            assert.equal(acct1.balance(), 100);
            assert.deposit(-30);
            assert.equal(acct1.balance(), 100);
        });

        it('should not allow charging to overdraft', function () {
            let acct1 = new BankAccount('xx432', "James Doe");
            assert.equal(acct1.balance(), 0);
            assert.charge("Target", 30);
            assert.equal(acct1.balance(), 0);
        });

        it('should not allow charging to overdraft', function () {
            let acct1 = new BankAccount('xx432', "James Doe");
            assert.equal(acct1.balance(), 0);
            assert.charge("Target", -30);
            assert.equal(acct1.balance(), 30);   
        });
    });

    describe("#testing transaction creation" , function{
        it('Should create a transaction correctly if it was depost', function(){
            let t1 = new Transaction(30, "Deposit");
            assert.equal(t1.amount, 30);
            assert.equal(t1.payee, "Deposit");
            assert.notEqual(t1.date, undefined);
            assert.notEqual(t1.date, null);
        });
        it('Should create a transaction correctly if it was charge', function(){
            let t1 = new Transaction(-34.45, "Target");
            assert.equal(t1.amount, -34.45);
            assert.equal(t1.payee, "Target");
            assert.notEqual(t1.date, undefined);
            assert.notEqual(t1.date, null);
        });
    })

};