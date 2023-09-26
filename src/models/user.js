const mongo=require("mongoose");
const bycript=require("bcrypt");
const saltaround=10;

const useresquema= new mongo.Schema({
    Nombre: {type:String, required:true},
    correo:{type:String, required:true, unique:true},
    contraseña: {type:String, require:true}
},{
    timestamps:true
});


useresquema.pre('save', function(next){
    if(this.isNew || this.isModified('contraseña')){
        const doc=this;
        bycript.hash(doc.contraseña,saltaround, (err,hashedcontra)=>{
            if(err){
                next(err);
            }else{
                doc.contraseña=hashedcontra;
                next()
            }

        });
    }else{
        next();
    }
})






module.exports=mongo.model('users',useresquema);