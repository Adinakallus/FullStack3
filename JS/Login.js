document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    // Get form values
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

     // Simulated AJAX request
     var fxhr = new FXMLHttpRequest();//Creates a new FXMLHttpRequest object, 
                                //which is used to make HTTP requests from the browser.
     fxhr.open("GET", "api/login", true); 
     fxhr.onload = function() {// checks the HTTP status code of the response
        if (xhr.status == 200) {
            // Successful login
            var response = JSON.parse(xhr.responseText);//The response text is parsed as JSON, and the message is displayed to the user.
            document.getElementById("loginMessage").innerText = response.message;
            // Redirect to dashboard or next page
            // window.location.href = "dashboard.html";
        } else {
            // Error handling
            document.getElementById("loginMessage").innerText = "Login failed. Please try again.";
        }
    };  
    
    fxhr.send();//Sends the request with the username and password data as JSON stringified payload.
});