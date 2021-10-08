const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');

//route
const blogRoute = require('./routes/blog.route')
const authRoute = require("./routes/auth.route")

require('dotenv').config();

const app = express();

mongoose
.connect(process.env.DATABASE, {useCreateIndex:true , useNewUrlParser:true , useUnifiedTopology:true , useFindAndModify:false})
.then( () => { console.log('connect database')})

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

if(process.env.NODE_ENV === 'development'){
app.use(cors({origin: `${process.env.CLIENT_ENV}`}));
}

app.use("/api" , blogRoute )
app.use("/api" , authRoute)

const port = process.env.PORT || 8000

app.listen(port , () => {
    console.log(`Start server port ${port}`)
})