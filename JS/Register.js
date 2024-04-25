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
        var confirmPassword = document.getElementById("Confirm-password").value;
        var email = document.getElementById("email").value;
        var balance = document.getElementById("balance").value;

        // Check if the entered passwords match
        if (password !== confirmPassword) {
            // Display an error message if the passwords do not match
            document.getElementById("loginMessage").innerHTML = "Passwords do not match";
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
        xhr.open('GET', 'http://localhost:port/api/getAllUsers', true);

        // Set up an event handler for when the response is received from the server
        xhr.onload = function() {
            var users = JSON.parse(xhr.responseText);
            // Check if the entered username or email already exists
            var userExists = users.some(function(existingUser) {
                return existingUser.username === username || existingUser.email === email;
            });

            if (userExists) {
                // Display an error message if the username or email already exists
                document.getElementById("loginMessage").innerHTML = "Username or email already exists";
            } else {
                // Send the user data to the server for registration
                // Create a new XMLHttpRequest to send the registration data to the server
                var registerRequest = new FXMLHttpRequest();
                registerRequest.open('POST', 'http://localhost:port/api/addUser', true);
                registerRequest.setRequestHeader('Content-Type', 'application/json');

                // Set up an event handler for when the response is received from the server
                registerRequest.onload = function() {
                    if (registerRequest.status === 201) {
                        // Display a success message to the user
                        document.getElementById("loginMessage").innerHTML = "User registered successfully!";
                        // Reset the form fields after successful registration
                        registerForm.reset();
                    } else {
                        // Display an error message if registration fails
                        document.getElementById("loginMessage").innerHTML = "Failed to register user";
                    }
                };

                // Send the user data as JSON to the server for registration
                registerRequest.send(JSON.stringify(user));
            }
        };

        // Send the request to the server to fetch all users
        xhr.send();
        window.location.href = "../HTML/Login.html";

    });
    
});
