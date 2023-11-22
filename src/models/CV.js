const mongo=require('mongoose');
const schema=mongo.Schema;

const CVschema=new schema({
    nombre:{
        Type:String,
        require:true
    },
    apellidos:{
        Type:String,
        require:true
    },
    DNI:{
        Type:String,
        require:true
    },
    direccion:{
        Type:String,
        require:true
    },
    telefono:{
        Type:String,
        require:true
    },
    ftperfil:{
        Type:Image,
        require:false
    },
    
},
{
    timestamps:true
});


module.exports=mongo.model('CV',CVschema);