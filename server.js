const express=require('express')
const colors =require('colors')
const moragan = require ('morgan')
const dotenv =require('dotenv');
const connectDB = require('./config/db');
const userRoutes=require('./routes/userRoutes');
const bodyParser=require('body-parser')

//dotenv config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app =express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))

//middlewares
app.use(express.json());
app.use(moragan("dev"));

//routes

app.use('/api/v1/user',userRoutes);
app.get('/',(req,res) => {
    return res.status(200).json({'name':'aditya'})})

//port
const port=process.env.PORT || 8080
//listen port
app.listen(port,()=>{
    console.log(`server is running in ${process.env.NODE_MODE} on port ${process.env.PORT}`
    .bgCyan.white);
});

