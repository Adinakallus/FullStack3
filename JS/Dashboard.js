document.addEventListener("DOMContentLoaded", function() {
    // Retrieve user information from sessionStorage
    var currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
        currentUser = JSON.parse(currentUser);
        // Display username
        var userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = currentUser.username;
        }
        // Display balance
        var balanceAmountElement = document.querySelector('.balanceAmount');
        if (balanceAmountElement) {
            balanceAmountElement.textContent = '$' + currentUser.balance;
        }
    } else {
        // Handle the case when user information is not available
        console.log('User information not found.');
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // Add expense form submission handler
    var addExpenseForm = document.getElementById('addExpenseForm');
    if (addExpenseForm) {
        addExpenseForm.addEventListener('submit', function(event) {
            event.preventDefault();
            var amount = parseFloat(document.getElementById('expenseAmount').value);
            var title = document.getElementById('expenseTitle').value;
            var date = document.getElementById('expenseDate').value;
            var type = document.getElementById('expenseType').value;
            
            // Construct the expense object
            var expense = {
                amount: amount,
                title: title,
                date: date,
                type: type
            };

            // Call a function to handle adding the expense to the backend
            addExpense(expense);
        });
    }
});

function addExpense(expense) {
    // You can add your logic here to send the expense data to the server
    // For example, you can use XMLHttpRequest or fetch API to make a POST request
    // After adding the expense successfully, you may update the transactions list
}

