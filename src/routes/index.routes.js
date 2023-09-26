const express=require('express');
const rutas=express.Router();

rutas.get('/',(req,res)=>{
    res.render('index')
});

rutas.get('/login',(req,res)=>{
    res.render('login')
})

rutas.get('/contacto',(req,res)=>{
    res.render('contacto')
})

rutas.get('/inicio',(req,res)=>{
    res.render('inicio2')
})

rutas.get('/inicio/cv',(req,res)=>{
    res.render('cv')
})



module.exports=rutas;
