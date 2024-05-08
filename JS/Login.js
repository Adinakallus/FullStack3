
import { FXMLHttpRequest } from './FXMLHttpRequest.js';

// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function() {
    var loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        // Create a JavaScript object with the login credentials
        var loginData = {
            username: username,
            password: password
        };
        var jsonData = JSON.stringify(loginData);

        // Create an instance of FXMLHttpRequest
        var xhr = new FXMLHttpRequest();

        // Open a connection to the server to authenticate the user
        xhr.open('GET', "getUser", true);

        // Set up an event handler for when the response is received from the server
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                var user = JSON.parse(xhr.responseText);
                if (user && user.password === password) {
                    // If username and password match, redirect to home.html
                    window.location.href = "../HTML/Dashboard.html";
                } else {
                    // If password is incorrect, display error message
                    var errorMessage = "Incorrect password.";
                    displayErrorMessage(errorMessage);
                }
            } else if (xhr.status === 404) {
                // If user not found, display error message
                var errorMessage = "User not found.";
                displayErrorMessage(errorMessage);
            } else {
                // If an unexpected error occurs, display generic error message
                var errorMessage = "An error occurred.";
                displayErrorMessage(errorMessage);
            }
        };

        // Send the request to the server to authenticate the user
        xhr.send(jsonData);
    });

    function displayErrorMessage(message) {
        // Display an error message to the user
        alert(message);
    }
});
