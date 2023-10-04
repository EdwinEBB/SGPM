const express=require('express');
const rutas=express.Router();
const user= require('../models/user');

rutas.get('/',(req,res)=>{
    res.render('index')
});

rutas.get('/login',(req,res)=>{
    res.render('login')
})

rutas.get('/contacto',(req,res)=>{
    res.render('contacto');
})

rutas.get('/inicio',(req,res)=>{
    res.render('inicio2')
})

rutas.get('/inicio/cv',(req,res)=>{
    res.render('cv')
})
rutas.get('/inicio/cv/cv2',(req,res)=>{
    res.render('cv2')
})

rutas.get('/inicio/cv/cv2/cv3',(req,res)=>{
    res.render('cv3')
})

rutas.get('/inicio/crud', async (req,res)=>{
    const muser= await user.find()
    res.render('gestionusers', {muser})
})

rutas.delete('/inicio/crud/delete/:id', async (req,res)=>{
    await user.findByIdAndDelete(req.params.id);
    res.redirect('/inicio/crud')
});



module.exports=rutas;
