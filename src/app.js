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
console.log(process.env.TESTING);
require('./config/passport');
app.use(configurarpassport());

app.use(bodyparcero.json());

var globo= new notifier.WindowsBalloon({
    withFallback:false,
    customPath:undefined
});



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
    
/*const us={
        correo:req.body.correo,
        contraseña:req.body.contraseña
    };
    console.log(us.contraseña);

    const si= async (p)=>{
        
        const encontrar= await usuario.findOne({correo:us.correo}).exec();
       if(!encontrar){
            globo.notify({
                title:'Usuario no encontrado',
                message:us.correo+' no esta registrado',
                time:5000,
                sound:false,
                wait:true,
                type:'error'
            },
            function(err,response){
                console.log(response);
            });
            res.redirect('/login');
        }else{
            const checkcontra= await compare(us.contraseña,encontrar.contraseña);
            console.log(checkcontra);
            if(checkcontra){
                notifier.notify({
                    title:'Inicio de sesion completado',
                    message:"Bienvenido "+encontrar.Nombre,
                    icon:path.join(__dirname, 'public/img/logo.jpeg'),
                    sound:true,
                    wait:true,
                    timeout:1
                },
                function(err,response,metadata){

                })
                res.redirect('/inicio')
            }else{
                globo.notify({
                    title:'Contraseña incorrecta',
                    message:"La contraseña que digitaste no es correcta",
                    time:1000,
                    timeout:1000,
                    sound:true,
                    wait:true,
                    type:'warn'
                },
                function(err,response){
                    console.log(response);
                });
                res.redirect('/login');
            }
        }
    };
    //console.log(us);
    si(us);*/
);



app.use((req,res)=>{
    res.status(404).sendFile(__dirname + "/public/404.html")
});


app.listen(app.get('port'),()=>{
    console.log(`Servidor iniciado en el puerto ${app.get('port')}`)
})




