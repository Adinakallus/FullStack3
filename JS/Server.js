const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Import the database module
const db = require("./DataBase").default;

app.use(bodyParser.json());

//ADD USER
app.post("api/addUser", (req, res)=>{
    const newUser = req.body;
    db.addUser(newUser);
    res.status(201).json({ message: 'User added successfully' });

})

//GET ALL USERS
app.get("api/getAllUsers", (req, res)=>{
    const users = db.getAllUsers();
    res.status(200).json(users);

})

//GET USER
app.get("api/getUser", (req, res)=>{
    const username = req.params.username;

    const user = db.getUser(username);
    res.status(200).json(user);
    if(user){
        res.status(200).json(user);
    } else{
    res.status(404).json({message: 'User not found'});
    }

})

//UPDATE USER
app.put("api/updateUser", (req,res)=>{
    const updatedUser=req.body;
    db.updateUser(updatedUser);
    res.status(200).json({message:'User updated succesfully'})
})


//DELETE USER
app.delete("api/deleteUser", (req,res)=>{
    const username=req.params.username;
    db.deleteUser(username);
    res.status(200).json({message:'User deleted succesfully'})
})


//ADD EXPENSE
app.post("api/addExpense", (req,res)=>{
    const { username, expense } = req.body;
    db.addExpense(username, expense);
    res.status(200).json({message:'Expense added succesfully'})
})


//DELETE EXPENSE

app.delete("api/deleteExpense", (req,res)=>{
    const {username, expenseId}=req.params;
    db.deleteExpense(username, expenseId);
    res.status(200).json({message:'Expense deleted succesfully'})
})