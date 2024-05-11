import { FXMLHttpRequest } from './FXMLHttpRequest.js';

// Define the navigateToLogin function
function navigateToLogin() {
    // Wait for the DOM content to be fully loaded before executing the script
    document.addEventListener("DOMContentLoaded", function() {
        // Get the login form element by its ID
        var loginForm = document.getElementById("loginForm");

        // Listen for the form submission event
        loginForm.addEventListener("submit", function(event) {
            // Prevent the default form submission behavior
            event.preventDefault();

            // Retrieve the values entered by the user in the form fields
            var username = document.getElementById("login-username").value;
            var password = document.getElementById("login-password").value;

            // Create a JavaScript object with the login credentials
            var loginData = {
                username: username,
                password: password
            };
            var jsonData = JSON.stringify(loginData);

            // Create an instance of FXMLHttpRequest
            var xhr = new FXMLHttpRequest();

            // Open a connection to the server to authenticate the user
            xhr.open('POST', 'authenticateUser', true);

            // Set the Content-Type header
            // xhr.setRequestHeader('Content-Type', 'application/json');

            // Listen for the response from the server
            xhr.onload = function() {
                if (xhr.status === 200) {
                    var user = JSON.parse(xhr.responseText);
                    // Check if user is authenticated
                    if (user && user.password === password) {
                        // Store user information in sessionStorage
                        sessionStorage.setItem('currentUser', JSON.stringify(user));
                        // Redirect to the Dashboard page
                        window.location.href = "../HTML/Dashboard.html";
                    } else {
                        // If password is incorrect, display error message
                        document.getElementById("loginMessage").innerHTML ="Incorrect username or password.";
                    }
                } else {
                    // If user not found or request failed, display error message
                    document.getElementById("loginMessage").innerHTML = "Failed to authenticate user.";
                }
            };

            // Listen for error event from the server
            xhr.onerror = function() {
                document.getElementById("loginMessage").innerHTML = "Failed to authenticate user.";
            };

            try {
                // Send the request to the server to authenticate the user
                xhr.send(jsonData);
            } catch(error) {
                // If there is an error during sending request, display error message
                document.getElementById("loginMessage").innerHTML = "Failed to authenticate user.";
            }
        });
    });
}

// Call the navigateToLogin function to execute login functionality
navigateToLogin();
