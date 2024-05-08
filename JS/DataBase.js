class DataBase {
    addUser(user) {
        const allUsers = this.getAllUsers();
        allUsers.push(user);
        localStorage.setItem("users", JSON.stringify(allUsers));
    }

    getAllUsers() {
        const usersJSON = localStorage.getItem("users");
        return usersJSON ? JSON.parse(usersJSON) : [];
    }

    getUser(username) {
        const allUsers = this.getAllUsers();
        return allUsers.find(user => user.username === username);
    }

    updateUser(updatedUser) {
        const allUsers = this.getAllUsers();
        const index = allUsers.findIndex(user => user.username === updatedUser.username);
        if (index !== -1) {
            allUsers[index] = updatedUser;
            localStorage.setItem("users", JSON.stringify(allUsers));
        }
    }

    deleteUser(username) {
        const allUsers = this.getAllUsers();
        const filteredUsers = allUsers.filter(user => user.username !== username);
        localStorage.setItem("users", JSON.stringify(filteredUsers));
    }

    addExpense(username, expense) {
        const user = this.getUser(username);
        if (user) {
            user.expenses.push(expense);
            user.balance += expense; // Update balance
            this.updateUser(user);
        }
    }

    deleteExpense(username, expenseId) {
        const user = this.getUser(username);
        if (user) {
            user.expenses = user.expenses.filter(expense => expense.id !== expenseId);
            this.updateUser(user);
        }
    }
}
module.exports = DataBase;


//export default Database;
