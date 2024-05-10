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
