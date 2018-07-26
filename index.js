const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const keys = require('./config/dev');
require('./model/imageModel');




// Mongo connection
mongoose.connect(keys.mongoURI)
    .then(res => console.log("Connected to DB"))
    .catch(err => console.log(err))


const app = express();
app.use(cors());
app.use(bodyParser.json())


require('./routes/queryImage')(app);

const PORT = 4000;
app.listen(PORT);
console.log('Server listening at 4000')