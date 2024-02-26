const app=require("./server");
const env=require("dotenv").config();
const bodyparcero=require("body-parser");
const connectamongo = require("./db");
const usuario=require("./models/user");
const compare=require("./helpers/baicript");
const notifier=require("node-notifier");
const path=require("path");
const passport=require('passport');
const configurarpassport=require('./config/passport');
const globo=require("./helpers/Notificaciones")
console.log(process.env.TESTING);
require('./config/passport');
app.use(configurarpassport());
app.use(bodyparcero.json());



connectamongo();


app.post('/register',(req,res)=>{
    const nuevou={
        Nombre:req.body.nombre,
        correo:req.body.correo,
        contraseña:req.body.contraseña
    };
    
   if(nuevou.Nombre=="" || nuevou.correo==""||nuevou.contraseña==""){
    globo.notify({
        title:'Campos vacios',
        message:'No pueden quedar campos vacios',
        time:1000,
        timeout:1,
        sound:true,
        wait:true,
        type:'warn'
    });
    res.redirect('/login');
   }else{
    const newu=new usuario(nuevou);
    console.log(newu);
    const guardar= async (p)=>{
        const existente= await usuario.findOne({correo:nuevou.correo}).exec();
        if(existente){
            globo.notify({
                title:'Usuario ya existente',
                message:nuevou.correo+" ya existe",
                time:5000,
                sound:true,
                wait:true,
                type:'warn'
            });
            res.redirect('/login');
        }else{
            const r= await newu.save();
            if(!r){
                res.status(500).send("ERROR AL REGISTRAR");
            }else{
                notifier.notify({
                    title:'Usuario registrado correctamente',
                    message:`${nuevou.Nombre} has sido registrado correctamente`
                })
                res.redirect('/login');
            }
            console.log(r);
        }
        
   }
   guardar();
   }
});

app.post('/autenticar', passport.authenticate('local',{
    failureRedirect:'/verficarcamposaut',
    successRedirect:'/inicio',
    failureFlash:false
})
    



app.use((req,res)=>{
    res.status(404).sendFile(__dirname + "/public/404.html")
});


app.listen(app.get('port'),()=>{
    console.log(`Servidor iniciado en el puerto ${app.get('port')}`)
})




