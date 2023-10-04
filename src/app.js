const app=require("./server");
const env=require("dotenv").config();
const express=require("express");
const bodyparcero=require("body-parser");
const connectamongo = require("./db");
const usuario=require("./models/user");
const compare=require("./helpers/baicript");

console.log(process.env.TESTING);

app.use(bodyparcero.json());



connectamongo();


app.post('/register',(req,res)=>{
    const nuevou={
        Nombre:req.body.nombre,
        correo:req.body.correo,
        contraseña:req.body.contraseña
    };
    
   const newu=new usuario(nuevou);
   console.log(newu);

   const guardar= async (p)=>{
        const r= await newu.save();
        if(!r){
            res.status(500).send("ERROR AL REGISTRAR");
        }else{
            res.redirect('/');
        }
        console.log(r);
   }
   guardar();
});

app.post('/autenticar',(req,res)=>{
    const us={
        correo:req.body.correo,
        contraseña:req.body.contraseña
    };
    console.log(us.contraseña);

    const si= async (p)=>{
        
        const encontrar= await usuario.findOne({correo:us.correo}).exec();
       if(!encontrar){
            res.status(500).send("usuario no encontrado");
        }else{
            const checkcontra= await compare(us.contraseña,encontrar.contraseña);
            console.log(checkcontra);
            if(checkcontra){
               res.redirect('/inicio');
            }else{
                res.status(500).send(`CONTRASEÑA INCORRECTA`);
            }
        }
    };
    //console.log(us);
    si(us);
});



app.use((req,res)=>{
    res.status(404).sendFile(__dirname + "/public/404.html")
});


app.listen(app.get('port'),()=>{
    console.log(`Servidor iniciado en el puerto ${app.get('port')}`)
})




