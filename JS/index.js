function navigateTo(page) {
    const templates = document.querySelectorAll('template');
    templates.forEach(template => {
        if (template.id === `${page}-template`) {
            document.getElementById('app').innerHTML = template.innerHTML;
        }
    });
}

// Initially navigate to the login page
navigateTo('login');