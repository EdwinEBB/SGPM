const bcrypt=require("bcrypt");

const compare= async(contraplana,contraencrip)=>{
    return await bcrypt.compare(contraplana, contraencrip);
}


module.exports=compare;