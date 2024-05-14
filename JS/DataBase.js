//localStorage.clear();

export function addUser(user) {
    const allUsers = this.getAllUsers();
    allUsers.push(user);
    localStorage.setItem("users", JSON.stringify(allUsers));
}

export function getAllUsers() {
    const usersJSON = localStorage.getItem("users");
    return usersJSON ? JSON.parse(usersJSON) : [];
}

export function getUser(username) {
    const allUsers = getAllUsers();
    return allUsers.find(user => username == user.username);
}

export function updateUser(updatedUser) {
    const allUsers = this.getAllUsers();
    const index = allUsers.findIndex(user => user.username === updatedUser.username);
    if (index !== -1) {
        allUsers[index] = updatedUser;
        localStorage.setItem("users", JSON.stringify(allUsers));
    }
}

export function deleteUser(username) {
    const allUsers = this.getAllUsers();
    const filteredUsers = allUsers.filter(user => user.username !== username);
    localStorage.setItem("users", JSON.stringify(filteredUsers));
}

export function addExpense(username, expense) {
    const user = this.getUser(username);
    if (user) {
        user.expenses.push(expense);
        console.log(expense.amount)
        user.balance =user.balance+ expense.amount; // Update balance
        this.updateUser(user);
    }
}

export function deleteExpense(username, expenseId) {
    const user = this.getUser(username);
    if (user) {
        user.expenses = user.expenses.filter(expense => expense.id !== expenseId);
        this.updateUser(user);
    }
}

// Function to get expenses by username
export function getExpenses(username) {
    const user = getUser(username);
    if (user) {
        return user.expenses;
    } else {
        throw new Error('User not found');
    }
}


//export default Database;