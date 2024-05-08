import * as DB from "./DataBase.js"
    


    // Function to add a user with validation
     export function addUser(newUser) {
        const existingUser =DB.getUser(newUser.username);
        if (existingUser) {
            throw new Error('User already exists');
        } else {
            this.db.addUser(newUser);
            return { message: 'User added successfully' };
        }
    }

    // Function to get all users
    export function getAllUsers() {
        const users = DB.getAllUsers();
        console.log(users);
        return users;
    }

    // Function to get a user by username
    export function getUser(username) {
        const user = DB.getUser(username);
        if (user) {
            return user;
        } else {
            throw new Error('User not found');
        }
    }

    // Function to update a user
    export function updateUser(updatedUser) {
        const existingUser = DB.getUser(updatedUser.username);
        if (!existingUser) {
            throw new Error('User not found');
        } else {
            this.db.updateUser(updatedUser);
            return { message: 'User updated successfully' };
        }
    }

    // Function to delete a user
    export function deleteUser(username) {
        const existingUser = DB.getUser(username);
        if (!existingUser) {
            throw new Error('User not found');
        } else {
            this.db.deleteUser(username);
            return { message: 'User deleted successfully' };
        }
    }

    // Function to add an expense
    export function addExpense(username, expense) {
        const existingUser = DB.getUser(username);
        if (!existingUser) {
            throw new Error('User not found');
        } else {
            this.db.addExpense(username, expense);
            return { message: 'Expense added successfully' };
        }
    }

    // Function to delete an expense
    export function deleteExpense(username, expenseId) {
        const existingUser = DB.getUser(username);
        if (!existingUser) {
            throw new Error('User not found');
        } else {
            this.db.deleteExpense(username, expenseId);
            return { message: 'Expense deleted successfully' };
        }
    }
