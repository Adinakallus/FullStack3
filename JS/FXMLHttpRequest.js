import * as Server from "./Server.js"

export class FXMLHttpRequest {
    
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

    send(data = ''){
        this.readyState = 2;
        const handleError = (statusCode, errorMessage) => {
            this.status = statusCode;
            this.responseText = errorMessage;
            if (typeof this.onerror === "function") {
                this.onerror(errorMessage); // Pass the error message to the onerror handler
            }
        };
        switch (this.method){
            case 'GET':
                this.readyState = 3;
                try{
                if(this.url=="getAllUsers"){
                    this.responseText=Server.getAllUsers()
                }
                if(this.url=="getUser"){
                    this.responseText=Server.getUser(data)
                }
                if (this.url === "getExpenses") {
                    this.responseText = Server.getExpenses(data);
                }
                            this.status =200;
                this.onload();
                }
                catch(error){
                    handleError(404, "User dosnt exist");

                }
            
                break;
          
            case 'POST':
               if(data){
                var pasredData=JSON.parse(data);
                    this.readyState = 3;
                    if(this.url=="addUser"){
                        console.log("data: ",data)
                        this.responseText=Server.addUser(data)
                    }
                    if(this.url=="addExpense"){
                        this.responseText=Server.addExpense(pasredData.username, pasredData.expense)
                    }
                    this.status =200;
                    this.onload();
                 }
                else{
                    handleError(400, "Bad Request: No data provided")
                }
                break;
             case 'DELETE':
                if(data){
                    var pasredData=JSON.parse(data);
                    this.readyState = 3;
                    if(this.url=="deleteUser"){
                        console.log("data: ",pasredData)
                        this.responseText=Server.deleteUser(pasredData)
                    }
                    if(this.url=="deleteExpense"){
                        this.responseText=Server.deleteExpense(pasredData.username, pasredData.expense)
                    }
                    this.status =200;
                    this.onload();
                }
                else{
                    handleError(400, "Bad Request: No data provided")
                }
                break;
            case 'PUT':
                if(data){
                    var pasredData=JSON.parse(data);
                    this.readyState = 3;
                    if(this.url=="updateUser"){
                        console.log("data: ",pasredData)
                        this.responseText=Server.updateUser(pasredData)
                    }
                    if(this.url=="updateExpense"){
                        this.responseText=Server.updateExpense(pasredData.username, pasredData.updatedExpense)
                    }
                    this.status =200;
                    this.onload();
                }
                else{
                    this.status =400;
                    handleError(400, "Bad Request: No data provided")
                }
                break;
        }
    }
}