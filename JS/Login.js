
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
            if (xhr.status ==200) {
                console.log("responseText: ",xhr.responseText);
                var user = xhr.responseText;
                console.log("user: ", user)
                if (user && user.password === password) {
                    // If username and password match, redirect to home.html
                    window.location.href = "../HTML/Dashboard.html";
                } else {
                    // If password is incorrect, display error message
                    var errorMessage = "Incorrect password.";
                   // displayErrorMessage(errorMessage);
                }
            } else {
               // console.error('Request failed:', xhr.status, xhr.statusText);

                // If user not found, display error message
                document.getElementById("LoginMessage").innerHTML = xhr.responseText;

            }
        };
        xhr.onerror = function() {
            console.error('Request failed:', xhr.status, xhr.statusText);
        };

        try{
        // Send the request to the server to authenticate the user
        xhr.send(jsonData);
      //  window.location.href = "../HTML/Dashboard.html";

        }catch(error){
            document.getElementById("LoginMessage").innerHTML = "User already exists";

        }
    });

 
});
