const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');
const {
  notFound,
  errorHandler,
  cors,
} = require('./middlewares/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
dotenv.config();

//Conneect DB
connectDB();

const app = express();

//Except JSON data in body-parser
app.use(express.json());

//Handle CORS
app.use(cors);

//Test Server
app.get('/', (req, res) => {
  res.send('API  is Running....');
});

//Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

//Custom_Errorhandling
app.use(notFound);
app.use(errorHandler);

//PORT
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server Running ${process.env.NODE_ENV} mode in ${PORT}`.yellow.bold
  )
);
