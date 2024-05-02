// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function() {
    // Get the register form element by its ID
    var registerForm = document.getElementById("registerForm");

    // Listen for the form submission event
    registerForm.addEventListener("submit", function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Retrieve the values entered by the user in the form fields
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("confirmPassword").value;
        var email = document.getElementById("email").value;
        var balance = document.getElementById("balance").value;

        // Check if the entered passwords match
        if (password !== confirmPassword) {
            // Display an error message if the passwords do not match
            document.getElementById("registerMessage").innerHTML = "Passwords do not match";
            return; // Exit the function early
        }

        // Create a JavaScript object to store the user data
        var user = {
            username: username,
            password: password,
            email: email,
            balance: balance
        };

        // Create an instance of FXMLHttpRequest
        var xhr = new FXMLHttpRequest();

        // Open a connection to the server to check if the username or email already exists
        xhr.open('GET', '/api/getAllUsers', true);

        console.log(xhr);
            
        // Send the request to the server to fetch all users
        xhr.send();

        //window.location.href = "../HTML/Login.html";

    });
    
});
