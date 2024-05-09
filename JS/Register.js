import { FXMLHttpRequest } from './FXMLHttpRequest.js';

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
            balance: balance,
            expenses:[]
        };

        var jsonData = JSON.stringify(user);
        // Create an instance of FXMLHttpRequest
        var xhr = new FXMLHttpRequest();

        // Open a connection to the server to check if the username or email already exists
        xhr.open('POST', 'addUser', true);

        // Set the Content-Type header
       // xhr.setRequestHeader('Content-Type', 'application/json');

        // Listen for the response from the server
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                // Request was successful, handle the response here
                console.log(xhr.responseText);
            } else {
                // Request failed
                console.error('Request failed:', xhr.status, xhr.statusText);
            }
        };
        xhr.onerror = function() {
            console.error('Request failed:', xhr.status, xhr.statusText);
            document.getElementById("registerMessage").innerHTML = "Failed to register user";
        };

        console.log(xhr);
        try {
            // Try to register the user
            xhr.send(jsonData);
            window.location.href = "../HTML/Login.html";

        } catch (error) {
            // User already exists
            document.getElementById("registerMessage").innerHTML = "User already exists";
        }
        

    });
    
});
