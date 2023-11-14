const passport = require('passport');
const localport=require('passport-local').Strategy;
const bc = require('bcrypt');
const Usuario = require('../models/user');
const notifi=require('node-notifier');
const mongoose=require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


passport.use('local',new localport({
    usernameField: 'correo',
    passwordField: 'contraseña'
}, async (correo,contraseña,done)=>{

    //capturar la pinche contraseña
    const userr= await Usuario.findOne({correo:correo});
    if(!userr){
        return done(null,false, notifi.notify({
            title:"Error",
            message:"Usuario no encontrado",
            type:'warn'
        }));
    }else{
        //captura de contraseña
        const verificajoder= await bc.compare(contraseña, userr.contraseña);
        if(verificajoder){
            return done(null,userr,notifi.notify({
                title:"inicio de sesión completado",
                message:"Bienvenido de vuelta "+userr.Nombre
            }));
        }else{
            return done(null,false, notifi.notify({
                title:"ERROR",
                message:"Contraseña incorrecta",
                type:'warn'
            }));
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user._id.toString()); // Convierte el ObjectId a cadena
  });
  
  passport.deserializeUser( async (id, done) => {
    try {
        const objectId = new ObjectId(id);
        const user = await Usuario.findById(objectId); // Utiliza await con una función async
    
        done(null, user);
      } catch (error) {
        done(error, null);
      }
  });


module.exports= function configurarpassport(){
    return passport.initialize();
}