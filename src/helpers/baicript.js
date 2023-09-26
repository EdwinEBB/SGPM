const bcrypt=require("bcrypt");

const encriptar= async(contrapla)=>{
    const encrip= await bcrypt.hash(contrapla,10);
}

const compare= async(contraplana,contraencrip)=>{
    return await bcrypt.compare(contraplana, contraencrip);
}


module.exports=compare;