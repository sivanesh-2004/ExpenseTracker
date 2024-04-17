 const mongoose=require('mongoose');
const { type } = require('os');
  
  const Expense= new mongoose.Schema({
      amount:{
        type:Number
      },
      category:{
        type:String
      },
      date:{
        type:String
      }
   });

  const ExpenseModel= mongoose.model('ExpenseCollections',Expense);

  module.exports={ExpenseModel};

  const userSchema=new mongoose.Schema({
    userName:{
        type:String
    },
    Password:{
        type:String
    },
    Email:{
        type:String
    }
  });

  const userModel=mongoose.model('UserDetails',userSchema);
  module.exports={ExpenseModel,userModel};