import { FXMLHttpRequest } from './FXMLHttpRequest.js';


document.addEventListener("DOMContentLoaded", function() {
        displayWelcome();
        fetchAndDisplayExpenses();
            function displayWelcome(){
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
            }


        //Add Expense
            // Add expense form submission handler
            var addExpenseForm = document.getElementById('addExpenseForm');

            if (addExpenseForm) {
                addExpenseForm.addEventListener('submit', function(event) {
                    event.preventDefault();
                    var amountString = parseFloat(document.getElementById('expenseAmount').value);
                    var title = document.getElementById('expenseTitle').value;
                    var date = document.getElementById('expenseDate').value;
                    var type = document.getElementById('expenseType').value;
                    if(!title){
                        document.getElementById("addExpenseMessage").innerHTML = "Please add title";

                    }else{
                    // Construct the expense object
                    var currentUser =JSON.parse( sessionStorage.getItem('currentUser'));
                    var amount = parseInt(amountString, 10)
                    var expense = {
                        id: Date.now(),
                        amount: amount,
                        title: title,
                        date: date?date: new Date().toLocaleDateString(),
                        type: type
                    };
                    const data={
                        username:currentUser.username,
                        expense:expense
                    }
                    var jsonData = JSON.stringify(data);
                    // Create an instance of FXMLHttpRequest
                    var xhr = new FXMLHttpRequest();
            
                    // Open a connection to the server to authenticate the user
                    xhr.open('POST', "addExpense", true);
            
                    // Set up an event handler for when the response is received from the server
                    xhr.onload = function() {
                        if (xhr.status ==200) {
                            var user = xhr.responseText;
                            sessionStorage.setItem('currentUser', JSON.stringify(user));
                            displayWelcome();
                            fetchAndDisplayExpenses();
                            console.log("responseText: ",xhr.responseText);
                            console.log("user: ", user)
                        
                        // Redirect to the Dashboard page
                        //window.location.href = "../HTML/Dashboard.html";
                        } else {
                        // console.error('Request failed:', xhr.status, xhr.statusText);
            
                            // If user not found, display error message
                            document.getElementById("addExpenseMessage").innerHTML = xhr.responseText;
            
                        }
                    };
                    xhr.onerror = function(message) {
                        document.getElementById("addExpenseMessage").innerHTML = message;
                    };
            
                    try{
                    // Send the request to the server to authenticate the user
                    xhr.send(data);
                //  window.location.href = "../HTML/Dashboard.html";
            
                    }catch(error){
                        //document.getElementById("addExpenseMessage").innerHTML = error;

                    }
                }
                addExpenseForm.reset();
                });
            };

        
            function  fetchAndDisplayExpenses(){
            // Retrieve user information from sessionStorage
                    var currentUser = sessionStorage.getItem('currentUser');
                    if (currentUser) {
                        currentUser = JSON.parse(currentUser);
                        // Display username
                        // var userNameElement = document.getElementById('userName');
                        // if (userNameElement) {
                        //     userNameElement.textContent = currentUser.username;
                        // }
                        // // Display balance
                        // var balanceAmountElement = document.querySelector('.balanceAmount');
                        // if (balanceAmountElement) {
                        //     balanceAmountElement.textContent = '$' + currentUser.balance;
                        // }
                        
                        // Fetch and display expenses
                        var xhr = new FXMLHttpRequest();
                        xhr.open('GET', 'getExpenses', true);
                        xhr.onload = function() {
                            if (xhr.status == 200) {
                                const expenses = xhr.responseText;
                                displayExpenses(expenses);
                            } else {
                                console.error('Failed to fetch expenses:', xhr.status, xhr.statusText);
                            }
                        };
                        xhr.onerror = function() {
                            console.error('Request failed:', xhr.status, xhr.statusText);
                        };
                        try{
                        xhr.send(currentUser.username);
                        }
                        catch(error){
                            console.log('User information not found.');

                        }
                    } else {
                        // Handle the case when user information is not available
                        console.log('User information not found.');
                    }
                }

            function displayExpenses(expenses) {
                var transactionsList = document.querySelector('.transactions');
                transactionsList.innerHTML = ''; // Clear existing list
                
                expenses.forEach(expense => {
                    var listItem = document.createElement('li');
                    var transactionItem = document.createElement('div');
                    transactionItem.classList.add('transactionItem');
                    var transactionInfo = document.createElement('div');
                    transactionInfo.classList.add('transactionInfo');
            
                    var amountElement = document.createElement('div');
                    amountElement.classList.add('amount');
                    amountElement.textContent = expense.amount > 0 ? '$' + expense.amount : '-$' + Math.abs(expense.amount);
                    amountElement.style.color = expense.amount > 0 ? 'green' : 'red';
            
                    var titleElement = document.createElement('div');
                    titleElement.classList.add('title');
                    titleElement.textContent = expense.title;
            
                    var dateElement = document.createElement('div');
                    dateElement.classList.add('date');
                    dateElement.textContent = expense.date;
            
                    transactionInfo.appendChild(amountElement);
                    transactionInfo.appendChild(titleElement);
                    transactionInfo.appendChild(dateElement);
            
                    transactionItem.appendChild(transactionInfo);
            
                    var updateButton = document.createElement('button');
                    updateButton.textContent = 'Update';
                    updateButton.addEventListener('click', function() {
                        // Handle update expense functionality here
                        // You can show a form/modal to update the expense details
                    });
                        
                    var deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.addEventListener('click', function() {
                        var currentUser = sessionStorage.getItem('currentUser');
                        if (currentUser) {
                        currentUser = JSON.parse(currentUser);                       // var expenseId = expense.id; // Assuming each expense has a unique id
                        deleteExpense(currentUser.username, expense);
                        }
                    });            
                    transactionItem.appendChild(updateButton);
                    transactionItem.appendChild(deleteButton);
            
                    listItem.appendChild(transactionItem);
                    transactionsList.appendChild(listItem);
                });
            }

            function deleteExpense(username, expense) {
                var xhr = new FXMLHttpRequest();
                xhr.open('DELETE', 'deleteExpense', true);
                xhr.onload = function() {
                    if (xhr.status == 200) {
                        // Upon successful deletion, fetch and display expenses again
                        var user = xhr.responseText;
                        sessionStorage.setItem('currentUser', JSON.stringify(user));
                        displayWelcome();
                        fetchAndDisplayExpenses();
                        console.log("responseText: ",xhr.responseText);
                        console.log("user: ", user)                        
                    } else {
                        console.error('Failed to delete expense:', xhr.status, xhr.statusText);
                    }
                };
                xhr.onerror = function() {
                    console.error('Request failed:', xhr.status, xhr.statusText);
                };
                xhr.send(JSON.stringify({ username: username, expense: expense }));
            }

});



