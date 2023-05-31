
const express = require('express');
const Mongoose = require('mongoose');

const cors = require('cors')
const app = express();
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

let port = process.env.PORT || 3000;
const indexRoute = require('./routes/indexRouter');
app.use('/api/',indexRoute);
const {mongoose} = require('./paramConnectDB');
app.listen(port, ()=>{console.log(`Le server est est bien démarré sur le port ${port}. Ouvrez le lient http://localhost:${port} pour voir le message`)});
