import passport from "passport";
import LocalStrategy from "passport-local";
import { User } from "../model/index.js";
import jwt from "jsonwebtoken";
import {get_user} from './helper.mjs';

passport.use('signup', new LocalStrategy({
    usernameField: 'mobile',
    passwordField: 'password',
    passReqToCallback : true,
}, async (req, mobile, password, done)=> {
    try{
        const user = await User.create({
            name : req.body.name,
            mobile ,
            password ,
        });
        done(null, user);
    } catch (error){
        done(error);
    };
}));

export function signup(req, res, next) {
    passport.authenticate('signup', { session: false }, (err, user, info) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: 'Error creating user' });
        }
        if (!user) {
            return res.status(400).send({ message: 'User not created' });
        }
        res.status(201).send({ message: 'User created successfully' });
    })(req, res, next);
};


export async function login(req, res, done) {
    passport.use('login', new LocalStrategy({
        usernameField: 'mobile',
        passwordField: 'password',
        passReqToCallback: true,
    }, async (req, mobile, password, done) => {
        const InvalidUserError = new Error('Invalid mobile or password !!');
        try {
            const user = await User.findOne({
                where: {
                    mobile: mobile,
                }
            });
    
            if (!user) {
                done(InvalidUserError);
                return;
            }
    
            const hasValidPassword = await user.isValidPassword(password);
    
            if (!hasValidPassword) {
                done(InvalidUserError);
                return;
            }
    
            done(null, user);
    
        } catch (error) {
            done(error);
        }
    }));
    passport.authenticate('login', { session: false });
    try {
        const user = await User.findOne({
            where: {
                mobile: req.body.mobile,
            }
        });
        if (!user) {
            console.log(req.body.mobile)
            res.status(401).send({ message: "Invalid mobile  !!!" });
            return;
                                                                                                                            
        } else{
            const pass =user.isValidPassword(req.body.password)
            if (pass){
                const payload = {
                    user: { id:user.id ,mobile :user.mobile
                    }
                }
                const JWT_SECRET = "66d26fd51c6c4e50b6ba3094715c740feaafded2fd4bdccf492c30bf062ca20fc963c243fcf926ac031049bdce45fe638a44696959e5853826a58219c2057ea3";
                const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 30 });
                res.json({
                    token,
                })
                get_user(token)
            } else{
                res.status(401).send({ message: "Invalid password !!!" });

            };  
        };
    } catch (error) {
        console.error(error);
    };    
};
