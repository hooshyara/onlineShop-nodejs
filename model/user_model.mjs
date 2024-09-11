import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt';

async function hashPassword(user) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    
}

export default function defineUser( sequelize){
    const User = sequelize.define('User', {
        mobile : {
            type : DataTypes.STRING(12),
            allowNull : false,
        },
        name : {
            type : DataTypes.STRING(20),
            allowNull:false,
         },
         password : {
            type : DataTypes.STRING(200),
            allowNull:false,
         },
         
         createdAt : {
            type:DataTypes.DATE(),
            
         },
         updatedAt : {
            type:DataTypes.DATE(),
            timestamps:false,
         },
    },
    {
        hooks : {
            beforeCreate : hashPassword,
            beforeUpdate : hashPassword
        },
        
     },    
);
    User.prototype.isValidPassword = function (password)  {
        return bcrypt.compareSync(password, this.password);
}
    return User;
}