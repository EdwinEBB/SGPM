const express= require('express');
const path= require('path');
const exphbs=require('express-handlebars');
const rutas= require('./routes/index.routes');
const motor=require('consolidate');
const app= express();


//setting
app.set('port', process.env.PORT || 8000);


//midlewares
app.use(express.urlencoded({extended:false}))

//archivos estaticos
app.use(express.static(path.join(__dirname, './public')))

//vistas
app.set('views',path.join(__dirname, './public'));
app.engine('html', motor.mustache);
app.set('view engine', 'html');
//routes
app.use(rutas);




module.exports= app;