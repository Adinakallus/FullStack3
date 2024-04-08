document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    // Get form values
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

     // Simulated AJAX request
     var xhr = new XMLHttpRequest();//Creates a new XMLHttpRequest object, 
                                //which is used to make HTTP requests from the browser.
     xhr.open("POST", "api/login", true);
     xhr.setRequestHeader("Content-Type", "application/json");
 
     xhr.onload = function() {
        if (xhr.status == 200) {
            // Successful login
            var response = JSON.parse(xhr.responseText);
            document.getElementById("loginMessage").innerText = response.message;
            // Redirect to dashboard or next page
            // window.location.href = "dashboard.html";
        } else {
            // Error handling
            document.getElementById("loginMessage").innerText = "Login failed. Please try again.";
        }
    };  
    
    xhr.send(JSON.stringify({ username: username, password: password }));
});