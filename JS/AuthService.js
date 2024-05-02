class AuthService {
    constructor() {
        // Initialize the server instance
        this.server = new this.server();
    }

    // Method to add a new user
    addUser(newUser) {
        console.log("Adding user:", newUser);
        this.server.addUser(newUser); // Call addUser method from Server.js
        // Your implementation logic goes here
    }

    // Method to get all users
    getAllUsers() {
        console.log("Getting all users");
        const users = this.server.getAllUsers(); // Call getAllUsers method from Server.js
        // Your implementation logic goes here
        return users; // Example data
    }

    // Method to get a specific user by username
    getUser(username) {
        console.log("Getting user:", username);
        const user = this.server.getUser(username); // Call getUser method from Server.js
        // Your implementation logic goes here
        return user; // Example data
    }

    // Method to update a user's information
    updateUser(updatedUser) {
        console.log("Updating user:", updatedUser);
        this.server.updateUser(updatedUser); // Call updateUser method from Server.js
        // Your implementation logic goes here
    }

    // Method to delete a user by username
    deleteUser(username) {
        console.log("Deleting user:", username);
        this.server.deleteUser(username); // Call deleteUser method from Server.js
        // Your implementation logic goes here
    }

    // Method to add an expense for a user
    addExpense(username, expense) {
        console.log(`Adding expense for ${username}:`, expense);
        this.server.addExpense(username, expense); // Call addExpense method from Server.js
        // Your implementation logic goes here
    }

    // Method to delete an expense for a user
    deleteExpense(username, expenseId) {
        console.log(`Deleting expense ${expenseId} for ${username}`);
        this.server.deleteExpense(username, expenseId); // Call deleteExpense method from Server.js
        // Your implementation logic goes here
    }
}