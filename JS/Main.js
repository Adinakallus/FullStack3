function handleLogin() {
    // Redirect to the login page
    window.location.href = "../HTML/Login.html";
}

function handleSignup() {
    // Redirect to the signup page
    window.location.href = "../HTML/Register.html";
}


document.getElementById("login").addEventListener("click", handleLogin);
document.getElementById("signup").addEventListener("click", handleSignup);

