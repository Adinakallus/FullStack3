import * as DB from "./DataBase.js"
    


    // Function to add a user with validation
     export function addUser(newUserString) {
        const newUser=JSON.parse(newUserString)
        console.log(newUser.username)
        const existingUser =DB.getUser(newUser.username);
        if (existingUser) {
            throw new Error('User already exists');
        } else {
            DB.addUser(newUser);
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
    export function getUser(userDataString) {
        const userData=JSON.parse(userDataString)
        const username=userData.username;
        const password=userData.password;
        const user = DB.getUser(username);
        if (user) {
            if(user.password==password)
                 return user;
            else
            {
                throw new Error('Incorrect password');

            }
        
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
            DB.updateUser(updatedUser);
            return { message: 'User updated successfully' };
        }
    }

    // Function to delete a user
    export function deleteUser(username) {
        const existingUser = DB.getUser(username);
        if (!existingUser) {
            throw new Error('User not found');
        } else {
            DB.deleteUser(username);
            return { message: 'User deleted successfully' };
        }
    }

    // Function to add an expense
    export function addExpense(username, expense) {
        const existingUser = DB.getUser(username);
        if (!existingUser) {
            throw new Error('User not found');
        } else {
            DB.addExpense(username, expense);
            return { message: 'Expense added successfully' };
        }
    }

    // Function to delete an expense
    export function deleteExpense(username, expenseId) {
        const existingUser = DB.getUser(username);
        if (!existingUser) {
            throw new Error('User not found');
        } else {
            DB.deleteExpense(username, expenseId);
            return { message: 'Expense deleted successfully' };
        }
    }
