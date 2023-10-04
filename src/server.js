const express= require('express');
const path= require('path');
const rutas= require('./routes/index.routes');
const motor=require('consolidate');
const app= express();
const morgan=require('morgan');
const moveride=require('method-override');



//setting
app.set('port', process.env.PORT || 8000);


//midlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(moveride('_method'));

//archivos estaticos
app.use(express.static(path.join(__dirname, './public')))

//vistas
app.set('views',path.join(__dirname, './public'));
app.engine('html', motor.mustache);
app.set('view engine', 'html');
//routes
app.use(rutas);




module.exports= app;