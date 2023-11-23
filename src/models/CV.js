const mongo=require('mongoose');
const user=require('../models/user')
const schema=mongo.Schema;

const CVschema=new schema({

    nombre:{
        type:String,
        require:true,
    },
    apellidos:{
        type:String,
        require:true,
    },
    DNI:{
        type:Number,
        require:true,
    },
    direccion:{
        type:String,
        require:true,
    },
    telefono:{
        type:Number,
        require:true,
    },
    ftperfil:{
        type:String,
    },
    usuario:{
        type:mongo.Schema.Types.ObjectId,
        ref:'users'
    },
    estudios:{
        Tipo:{
            type:String,
        },
        nombretitulo:{
            type:String
        },
        sobrel:{
            type:String
        }
    }
    
},
{
    timestamps:true,
});


module.exports=mongo.model('CV',CVschema);