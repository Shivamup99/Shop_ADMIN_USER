import express from 'express'
const PORT = process.env.PORT||5000;
import morgan from 'morgan';
import cors from 'cors'
import MongoConnection from './config/connection.js'
import category from './routes/category.js'
import product from './routes/product.js'
import auth from './routes/user.js'
import errorHandler from './healper/error.js'
import order from './routes/order.js'
import authJwt from './healper/jwt.js'


const app = express()

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors())
MongoConnection();

app.use("/public/uploads", express.static("public/uploads"));

app.use('/api',category);
app.use('/api',product);
app.use('/api/user',auth);
app.use('/api',order);
 //app.use(errorHandler);

app.listen(PORT,()=>{
   console.log(`Server is running on ${PORT}`)
})