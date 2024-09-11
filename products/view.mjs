import  Product  from "../model/products_model.mjs";
import multer from 'multer';
import { sequelize } from "../model/index.js";


const upload = multer({storage : multer.memoryStorage()});


export async function product(req, res) {
    try { 
        const Products = Product(sequelize);
        const product = await Products.findAll();
        res.json(product);
    }catch(error){
        res.status(500).send({
            message : 'error dari oskol',
            error,
        });
    }

}

export async function productDetail(req, res) {
    const Products = Product(sequelize);
    const product = await Products.findOne({
        where : {
            id : req.params.id,
        }
    });
    res.send(product);    

}

export async function productCreateCTL(req, res) {
    try{
        const Products = Product(sequelize);
        const { title ,describtion, price, inventory } = req.body;
        const { buffer: cover } = req.file;
        await Products.create({
            title,
            describtion,
            price,
            inventory,
            cover,
        })
        res.send({
            message : `product ${title} is create successfully !!`
        });
    }catch (error){
        console.error(error)
        res.status(400).send({
            message : "wrong",
            error,
        });
    };
}

const productCreate = [
    upload.single('cover'),
    productCreateCTL,
];

export {productCreate};

export async function productUpdateCTL(req, res) {
    try{
        const Products = Product(sequelize);
        const { title ,describtion, price, inventory } = req.body;
        const { buffer: cover } = req.file;
        await Products.update({
            title,
            describtion,
            price,
            inventory,
            cover,
        }, {
            where : {
                id : req.params.id
            }
        });
        res.send({
            message : `product ${title} is update successfully !!`
        });
    }catch(error){
        console.error(error)
        res.status(400).send({
            message : "wrong",
            error,
        });
    }; 
};

const productUpdate = [
    upload.single('cover'),
    productUpdateCTL,
];

export {productUpdate};