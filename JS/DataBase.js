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
    const allUsers = getAllUsers();
    const index = allUsers.findIndex(user => user.username === updatedUser.username);
    if (index !== -1) {
        allUsers[index] = updatedUser;
        localStorage.setItem("users", JSON.stringify(allUsers));
    }
    return  allUsers[index];
}

export function deleteUser(username) {
    const allUsers = this.getAllUsers();
    const filteredUsers = allUsers.filter(user => user.username !== username);
    localStorage.setItem("users", JSON.stringify(filteredUsers));
}

export function addExpense(username, expense) {
    const user = this.getUser(username);
    if (user) {
        console.log("Expense type:", expense.type);
        console.log("Expense amount:", expense.amount);
        // user.expenses=[],
        //user.balance=0;
        user.expenses.push(expense);
        console.log(expense.amount)
        if(expense.type=='income'){
         user.balance =user.balance+ expense.amount; // Update balance
        }
        if(expense.type=='expense'){
            user.balance =user.balance- expense.amount; // Update balance
           }
       var updatedUser= this.updateUser(user);
        return updatedUser;
    }
}

// export function deleteExpense(username, expense) {
//     const user = this.getUser(username);
//     if (user) {
//         user.expenses = user.expenses.filter(expense => expense.id !== expense.expenseId);
//         if(expense.type=='income'){
//             user.balance =user.balance-expense.amount; // Update balance
//            }
//            if(expense.type=='expense'){
//                user.balance =user.balance+ expense.amount; // Update balance
//               }
//         var updatedUser= this.updateUser(user);
//         return updatedUser;    }
// }
export function deleteExpense(username, expense) {
    var expenseId=expense.id;
    const user = this.getUser(username);
    if (user) {
        const index = user.expenses.findIndex(expense => expense.id === expenseId);
        if (index !== -1) {
            const deletedExpense = user.expenses.splice(index, 1)[0]; // Remove the expense from the array
            if (deletedExpense.type === 'income') {
                user.balance -= deletedExpense.amount; // Update balance for income
            } else if (deletedExpense.type === 'expense') {
                user.balance += deletedExpense.amount; // Update balance for expense
            }
            this.updateUser(user); // Update the user in the database
            return user; // Return the updated user object
        } else {
            throw new Error('Expense not found');
        }
    } else {
        throw new Error('User not found');
    }
}
// Function to update an expense
export function updateExpense(username, updatedExpense) {
    const user = getUser(username);

    if (user) {
        const index = user.expenses.findIndex(expense => expense.id === updatedExpense.id);
        if (index !== -1) {
            // Update the expense in the array
            const oldExpense=user.expenses[index];
            if (oldExpense.type === 'income') {
                user.balance -= oldExpense.amount; // Update balance for income
               
            } else if (oldExpense.type === 'expense') {
                user.balance += oldExpense.amount; // Update balance for expense
            }
            if(updateExpense.type==='income'){
                user.balance += updatedExpense.amount; // Update balance for income
            }
            if(updateExpense.type==='expense'){
                user.balance -= updatedExpense.amount; // Update balance for income
            }
            user.expenses[index] = updatedExpense;
            updateUser(user); // Update the user in the database
            return user; // Return the updated user object
        } else {
            throw new Error('Expense not found');
        }
    } else {
        throw new Error('User not found');
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