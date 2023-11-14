const jwt= require('jsonwebtoken');

const creartoken= async (user)=>{
    return jwt.sign(
        {
            _id:user._id,
            rol:user.rol
        },
        process.env.TK,
        {
            expiresIn:"2h"
        }

    )
}

const verifytoken= async(TK)=>{
    jwt.verify(TK,process.env.TK)

}


module.exports={creartoken,verifytoken};