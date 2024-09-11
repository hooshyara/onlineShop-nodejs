import express from 'express';
import { sequelize } from './model/index.js';
import user_router from './user/rout.mjs';
import product_router from './products/route.mjs';
import multer from 'multer';

const app = express();
const upload = multer({storage : multer.memoryStorage()});


function myLogger(req, res, next){
    console.log(`New request : ${req.url} method : ${req.method}`);
    next();
};
app.use(express.json());
app.use(myLogger);
app.use('/api', user_router);
app.use('/product', product_router);


try {
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');  
  } catch (error) {
    console.error('Unable to connect to the database:', error);
};


app.listen(3000, () => {
    console.log('server run on 3000 !');

});