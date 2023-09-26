const {Schema, model}=require('mongoose');

const cvesquema= new Schema({
    id:{
        type:Number,
        required:true
    },
    nombre:{
        type:String,
        required:true
    },
    apellido:{
    type:String,
    required:true
    },
    direccion:{
        type:String,
        required:true
    },
    telefon:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    }



})

module.exports= model('CV',cvesquema);