const ayudas={};
const notifa=require('node-notifier');
const globo= new notifa.WindowsBalloon({
    withFallback:false,
    customPath:undefined
});

ayudas.isAuthenticated= (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    globo.notify({
        title:'Acceso denegado',
        message:'Debes iniciar sesión para acceder a esta pagina',
        time:1000,
        wait:false,
        sound:true,
        type:'error'
    })
    res.redirect('/login');

}




module.exports=ayudas;