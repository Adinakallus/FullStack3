class FXMLHttpRequest {
    constructor() {
        this.readyState = 0;
        this.status = 0;
        this.responseText = null;
        this.onload = null;
        this.onerror = null;
    }

    open(method, url, async = true) {
        this.method = method;
        this.url = url;
        this.async = async;
        this.readyState = 1; // Opened
    }

    send(data) {
        if (this.readyState !== 1) {
            throw new Error("Invalid state: The request has not been opened");
        }
        // Assuming authService is initialized with the server instance
        let authService = new AuthService(); // Pass the server instance here

        // Call the function from AuthService to send the request asynchronously
        authService.sendRequest(this.method, this.url, data)
            .then(response => {
                // Update the status, readyState, and responseText properties
                this.status = response.status;
                this.readyState = 4; // Done
                this.responseText = response.body;

                // Call onload event handler
                if (typeof this.onload === "function") {
                    this.onload();
                }
            })
            .catch(error => {
                // Handle errors
                if (typeof this.onerror === "function") {
                    this.onerror(error);
                }
            });
    }
}