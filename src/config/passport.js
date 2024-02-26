const passport = require('passport');
const localport=require('passport-local').Strategy;
const bc = require('bcrypt');
const Usuario = require('../models/user');
const globo=require("../helpers/Notificaciones")
const mongoose=require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

passport.use(
  "local",
  new localport(
    {
      usernameField: "correo",
      passwordField: "contraseña",
    },
    async (correo, contraseña, done) => {
      //capturar la pinche contraseña
      const userr = await Usuario.findOne({ correo: correo });
      if (!userr) {
        return done(
          null,
          false,
          globo.notify({
            title: "Usuario no encontrado",
            message: "No se encontro el usuario digitado",
            time: 5000,
            sound: true,
            wait: false,
            type: "warn",
          })
        );
      } else {
        //captura de contraseña
        const verificajoder = await bc.compare(contraseña, userr.contraseña);
        if (verificajoder) {
          return done(
            null,
            userr,
            globo.notify({
              title: "Incio de sesión completado",
              message: "Bienvenido de vuelta " + userr.Nombre,
              time: 5000,
              sound: true,
              wait: false,
              type: "info",
            })
          );
        } else {
          return done(
            null,
            false,
            globo.notify({
              title: "ERROR",
              message: "La contraseña que has digitado es incorrecta",
              time: 5000,
              sound: true,
              wait: false,
              type: "warn",
            })
          );
        }
      }
    }
  )
);

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