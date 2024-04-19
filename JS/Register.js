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

      // Convert the user object to a JSON string and store it in the local storage
      localStorage.setItem(username, JSON.stringify(user));

      // Display a success message to the user
      document.getElementById("loginMessage").innerHTML = "User registered successfully!";

      // Reset the form fields after successful registration
      registerForm.reset();
  });
});
