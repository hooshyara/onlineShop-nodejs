import { Sequelize } from "sequelize";
import UserModel from './user_model.mjs';
import ProductModel from './products_model.mjs'
const sequelize = new Sequelize({
    database : 'node_shop',
    username : 'postgres',
    password : '12345',
    dialect : 'postgres',
    logging : false
});

const User = UserModel(sequelize);
const Product = ProductModel(sequelize);


export {User};
export {Product};
export {sequelize};