document.addEventListener("DOMContentLoaded", function() {
    var loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        // Retrieve user data from local storage
        var userData = JSON.parse(localStorage.getItem(username));

        if (userData && userData.password === password) {
            // If username and password match, redirect to home.html
            window.location.href = "../HTML/home.html";
        } else {
            // If username or password is incorrect, display error message
            var errorMessage = "Incorrect username or password.";
            displayErrorMessage(errorMessage);
        }
    });

    function displayErrorMessage(message) {
        // Use XMLHttpRequest to display an error message in a pop-up window
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "../HTML/error.html", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var errorWindow = window.open("", "Error", "width=400,height=200");
                errorWindow.document.write(xhr.responseText.replace("{message}", message));
            }
        };
        xhr.send();
    }
});
