function addUser(user) {
    const allUsers = getAllUsers();
    allUsers.push(user);
    localStorage.setItem("users", JSON.stringify(allUsers));
}


function getAllUsers() {
    const usersJSON = localStorage.getItem("users");
    return usersJSON ? JSON.parse(usersJSON) : [];
}
function getUser(username) {
    const allUsers = getAllUsers();
    return allUsers.find(user => user.username === username);
}

function updateUser(updatedUser) {
    const allUsers = getAllUsers();
    const index = allUsers.findIndex(user => user.username === updatedUser.username);
    if (index !== -1) {
        allUsers[index] = updatedUser;
        localStorage.setItem("users", JSON.stringify(allUsers));
    }
}

function deleteUser(username) {
    const allUsers = getAllUsers();
    const filteredUsers = allUsers.filter(user => user.username !== username);
    localStorage.setItem("users", JSON.stringify(filteredUsers));
}

function addExpense(username, expense) {
    const user = getUser(username);
    if (user) {
        user.expenses.push(expense);
        user.balance+=expense//update balance
        updateUser(user);
    }
}

function deleteExpense(username, expenseId) {
    const user = getUser(username);
    if (user) {
        user.expenses = user.expenses.filter(expense => expense.id !== expenseId);
        updateUser(user);
    }
}

// function updateBalance(username, newBalance) {
//     const user = getUser(username);
//     if (user) {
//         user.balance = newBalance;
//         updateUser(user);
//     }
// }

// Export the database functions
export default {
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    addExpense,
    deleteExpense,
};