require('dotenv').config();
const express = require('express');
const mongoose =require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const paymentBRoutes = require('./routes/payment');


const app = express();
const port = process.env.PORT || 5000;
const url = process.env.ATLAS_URI;
app.use(express.json());
app.use(cookieParser());
app.use(cors());

mongoose.connect(url).
      then(() => {
        console.log("MongoDB database connection established successfully");
      }).
      catch(error => console.log(error));


app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',orderRoutes);
app.use("/api", paymentBRoutes);

app.listen(port,function(){
    console.log('Server is running at',port);
})