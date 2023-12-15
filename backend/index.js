// importing
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/database');
const cors = require('cors');
const cloudinary = require('cloudinary');
const multiparty = require('connect-multiparty');

// creating app which runs on express
const app = express();
dotenv.config()
app.use(express.json())

// connecting to database
connectDB();

// cloudinary config
cloudinary.config({ 
  cloud_name: 'dvjjbmlsg', 
  api_key: '228794781863152', 
  api_secret: '6Wbr7jzMDkr7e44xue_nXfXQ42k' 
});

// multiparty
app.use(multiparty());


// creating a test route || client(request) -> server(response)
app.get('/test',(req,res)=>{
    res.send("Test route is working!!")
})

// creating a user routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/products', require('./routes/productRoutes'))
// http://localhost:5000/api/users/register


// Defining the port number
const PORT = process.env.PORT;

// Listen or run the server
app.listen(PORT,() => {
    console.log("Server is running!!")
})


