import { FXMLHttpRequest } from './FXMLHttpRequest.js';

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
            if(!title){
                document.getElementById("addExpenseMessage").innerHTML = "Please add title";

            }else{
            // Construct the expense object
            var currentUser = sessionStorage.getItem('currentUser');

            var expense = {
                amount: amount,
                title: title,
                date: date?date: new Date().toLocaleDateString(),
                type: type
            };
            const data={
                username:currentUser,
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
                    console.log("responseText: ",xhr.responseText);
                    var user = xhr.responseText;
                    console.log("user: ", user)
                   sessionStorage.setItem('currentUser', JSON.stringify(user));
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
            xhr.send(jsonData);
          //  window.location.href = "../HTML/Dashboard.html";
       
            }catch(error){
                //document.getElementById("addExpenseMessage").innerHTML = error;

            }
        }
        })
    };
    });
  