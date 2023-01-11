const express = require('express');

const app = express();

app.get('/', (req, res)=>{
    res.send('home-page')
})

app.listen(3001);