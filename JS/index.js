// document.addEventListener("DOMContentLoaded", function() {
//     // Function to show the register page
//     function loadRegisterPage() {
//         document.getElementById("registerSection").style.display = "block";
//         document.getElementById("dashboardSection").style.display = "none";
//         document.getElementById("loginSection").style.display = "none";
//     }
// });

import { FXMLHttpRequest } from './FXMLHttpRequest.js';
import './Dashboard.js';

document.addEventListener('DOMContentLoaded', function() {
    const loginSection = document.getElementById('loginSection');
    const dashboardSection = document.getElementById('dashboardSection');
    const loginForm = document.getElementById('loginForm');
    const logoutButton = document.getElementById('logoutButton');
    const registerSection = document.getElementById('registerSection');

    // Check if user is already logged in
    if (sessionStorage.getItem('currentUser')) {
        showDashboard();
    } else {
        showLogin();
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            sessionStorage.removeItem('currentUser');
            showLogin();
        });
    }

    function showLogin() {
        loginSection.style.display = 'block';
        dashboardSection.style.display = 'none';
        registerSection.style.display = 'none';

    }

    function showDashboard() {
        loginSection.style.display = 'none';
        registerSection.style.display = 'none';
        dashboardSection.style.display = 'block';
        import('./Dashboard.js').then(module => {
            module.initializeDashboard();
        });
    }

    window.showDashboard = showDashboard;
    window.showLogin = showLogin;
});
