const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/expense-manager',{useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true},(error)=>{
    if(!error){
        console.log('connected to database!')
    }else{
        throw new Error('Could not connect to database!')
    }
})