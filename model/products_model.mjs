import { DataTypes } from "sequelize";

export default function defineUser( sequelize){
    const Product = sequelize.define('Product', {
        title : {
            type : DataTypes.STRING(12),
            allowNull : false,
        },
        describtion : {
            type : DataTypes.STRING(20),
            allowNull:false,
         },
         
         price : {
            type : DataTypes.STRING(200),
            allowNull:false,
         },
         inventory : {
            type : DataTypes.INTEGER(),
            allowNull:false,
         },
         
         createdAt : {
            type:DataTypes.DATE(),
            
         },
         updatedAt : {
            type:DataTypes.DATE(),
            timestamps:false,
         },
         cover : {
            type : DataTypes.BLOB(),
            allowNull:false,
           

         },
    },
      
);
    return Product;
    
}
    
