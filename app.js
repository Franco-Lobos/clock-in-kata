const express = require('express');

//INIT 
const app = express();
// require('./database');


//Routes
app.get('/', (req, res)=>{
    res.send('home-page')
})

//Starting server
app.listen(3001);