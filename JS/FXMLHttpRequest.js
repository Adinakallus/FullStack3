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

    send(data = null) {
        if (this.readyState !== 1) {
            throw new Error("Invalid state: The request has not been opened");
        }

        // Simulate asynchronous behavior using setTimeout
        setTimeout(() => {
            // Simulate successful response
            this.status = 200;
            this.readyState = 4; // Done
            this.responseText = "Simulated response from server";

            // Call onload event handler
            if (typeof this.onload === "function") {
                this.onload();
            }
        }, 1000); // Simulate 1 second delay

    }
}

