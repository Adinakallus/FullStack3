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
        switch (this.method){
            case 'GET':
                this.readyState = 3;
                if(this.url=="getAllUsers"){
                    this.responseText=Server.getAllUsers()
                }
                if(this.url=="getUser"){
                    this.responseText=Server.getUser(data)
                }
                            this.status =200;
                this.onload();
                break;
          
            case 'POST':
               if(data){
                    this.readyState = 3;
                    if(this.url=="addUser"){
                        console.log("data: ",data)
                        this.responseText=Server.addUser(data)
                    }
                    if(this.url=="addExpense"){
                        this.responseText=server.addExpense(data.username, data.expense)
                    }
                    this.status =200;
                    this.onload();
                 }
                else{
                    this.status =400;
                    this.onerror();
                }
                break;
            //  case 'DELETE':
            //     if(this.setRequestHeader){
            //         this.readyState = 3;
            //         this.responseText = DB.DELETE(this.setRequestHeader);
            //         this.status =200;
            //         this.onload();
            //     }
            //     else{
            //         this.status =400;
            //         this.onerror();
            //     }
            //     break;
            // case 'DELETE_task':
            //     if(this.setRequestHeader !== ''){
            //         this.readyState = 3;
            //         this.responseText = DB.DELETE_task(this.setRequestHeader);
            //         this.status =200;
            //         this.onload();
            //     }
            //     else{
            //         this.status =400;
            //         this.onerror();
            //     }
            //     break;
            // case 'PUT_curr':
            //     if(this.setRequestHeader){
            //         console.log(this.setRequestHeader);
            //         this.readyState = 3;
            //         DB.PUT_curr(this.setRequestHeader);
            //         this.status =200;
            //         this.onload();
            //     }
            //     else{
            //         this.status =400;
            //         this.onerror();
            //     }
            //     break;
            // case 'PUT':
            //     if(this.setRequestHeader){
                    //console.log(this.setRequestHeader);
                 //   this.readyState = 3;
                //     DB.PUT(this.setRequestHeader);
                //     this.status =200;
                //     this.onload();
                // }
                // else{
                //     this.status =400;
                //     this.onerror();
                // }
                break;




        }


    }
}