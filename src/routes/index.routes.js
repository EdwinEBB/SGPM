const express=require('express');
const rutas=express.Router();
const user= require('../models/user');
const configurarpassport=require('../config/passport');
const notifier=require('node-notifier');
const globo= new notifier.WindowsBalloon({
    withFallback:false,
    customPath:undefined
});

rutas.use(configurarpassport());

const {isAuthenticated}=require('../helpers/Autenticar');

rutas.get('/',(req,res)=>{
    res.render('index')
});

rutas.get('/login',(req,res)=>{
    res.render('login')
})


rutas.get('/contacto',(req,res)=>{
    res.render('contacto');
})

rutas.get('/obtener',isAuthenticated,async(req,res)=>{
    if (req.isAuthenticated() && req.user) {
        const userId = req.user._id;
        console.log(userId);
    
        // Utiliza userId para hacer una búsqueda en la base de datos u otras operaciones
       const us=await user.findById(userId);
}})

rutas.get('/inicio',isAuthenticated , async (req,res)=>{
    if (req.isAuthenticated() && req.user) {
        const userId = req.user._id;
        console.log(userId);
    
        // Utiliza userId para hacer una búsqueda en la base de datos u otras operaciones
       const us=await user.findById(userId);
       res.render('inicio2',{us});
    }
   /* const useride= req.query.userid;
    const user2= await useride;
    console.log(user2);
    res.send(`${user2}`);*/

})

rutas.get('/inicio/contacto',isAuthenticated,(req,res)=>{
    res.render('contacto');
})

rutas.get('/inicio/logout', isAuthenticated, (req,res)=>{
    req.logOut(function(err){
        if(err){
            return next(err);
        }
    });
    globo.notify({
        title:'sesión finalizada',
        message:'Has finalizado la sesión',
        sound:true,
        wait:true,
        type:'info'
    });
    res.redirect('/');
})

rutas.get('/inicio/cv', isAuthenticated,(req,res)=>{
    res.render('cv')
})
rutas.get('/inicio/cv/cv2', isAuthenticated ,(req,res)=>{
    res.render('cv2')
})

rutas.get('/inicio/cv/cv2/cv3', isAuthenticated ,(req,res)=>{
    res.render('cv3')
})

rutas.get('/inicio/siesadmin',isAuthenticated,(req,res)=>{
   
})

rutas.get('/inicio/crud', isAuthenticated, async (req,res)=>{
    const muser= await user.find({rol:'usuario'})
    res.render('gestionusers', {muser})
})

rutas.delete('/inicio/crud/delete/:id', isAuthenticated, async (req,res)=>{
    await user.findByIdAndDelete(req.params.id);
    res.redirect('/inicio/crud');
    globo.notify({
        title:"Acción completada",
        message:"Usuario eliminado correctamente",
        time:1000,
        sound:true,
        wait:true,
        type:'info'
    })
});

rutas.get('/inicio/crud/edit/:id', isAuthenticated, async (req,res)=>{
    const u= await user.findById(req.params.id);
    res.render('edituser', {u});
})

rutas.put('/inicio/crud/edit-user/:id',isAuthenticated, async (req,res)=>{
    const {Nombre, correo}=req.body
    await user.findByIdAndUpdate(req.params.id,{Nombre, correo: correo})
    res.redirect('/inicio/crud')
    globo.notify({
        title:"Acción completada",
        message:"Los datos de "+Nombre+" han sido actualizados correctamente",
        time:1000,
        sound:true,
        wait:true,
        type:'info'
    })
})



module.exports=rutas;
