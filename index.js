
    const express=require('express');
    const bodyParse=require('body-parser');
    const mongoose=require('mongoose');
    const cors=require('cors');

    const app=express();
    app.use(bodyParse.json());
    app.use(cors());
    const {ExpenseModel,userModel}=require('./Schema.js');
    const bodyParser = require('body-parser');

 async function connectMongoDb()
{
     const port=process.env.PORT || 5000;
    try{
        await  mongoose.connect("mongodb+srv://crudApi:siva@cluster0.dplewox.mongodb.net/crudApi?retryWrites=true&w=majority&appName=Cluster0")
        console.log("DB Connection is Establised (:");
        app.listen(port,()=>{
            console.log("Application is Listening on Port Nunmber 5000");
        })
    }
    catch(error)
    {
        console.log(error);
        console.log("OOPS Db Connection not Connected :(")
    }
}

connectMongoDb();



 app.post('/Add-Expense', async (req,res)=>{
    try{

    await ExpenseModel.create({
        amount:req.body.amount,
        category:req.body.category,
        date:req.body.date
       })
       res.status(201).json({
          "status":"Sucess",
          "message":"Data is Successfully Posted"
       })
    }
    catch(error)
    {
        console.log(error);
        console.log("Ohh There is error Ocuured :(")
        res.status(500).json(
            {
                "status":"Faillure",
                "message":"There are some Problem",
                "error":error
            }
        )
    }
 })

 app.get('/get-Expense',async (req,res)=>{
    try{
     const expenseDetails= await ExpenseModel.find();
      res.status(200).json(expenseDetails);
    }
    catch(error)
    {
        res.status(500).json({
            "status":"failure",
            "message":"Error Occured",
            "error":error
        })
    }
 })


 // Deleting a particular entry using id 

   app.delete('/delete-expense/:id', async (req,res)=>{
    try{
      await ExpenseModel.findByIdAndDelete(req.params.id)
          res.status(202).json({
            "status":"Success",
            "message":"the Entry is Deleted.."
          })
    }
    catch(error)
    {
        res.status(500).json({
            "status":"failure",
             "message":"Somethings off's Could't deleted"
        })
    }
   });

   //Updating We use the Patch Method


   app.patch('/update-expense/:id', async (req,res)=>{
    try{
      await ExpenseModel.findByIdAndUpdate(req.params.id,{
        amount:req.body.amount,
        category:req.body.category,
        date:req.body.date
      })
          res.status(202).json({
            "status":"Success",
            "message":"the Entry is Updated"
          })
    }
    catch(error)
    {
        res.status(500).json({
            "status":"failure",
             "message":"Somethings off's Could't Updated..."
        })
    }
   });

