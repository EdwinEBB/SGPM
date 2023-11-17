const mongo=require('mongoose');
const schema=mongo.Schema;

const CVschema=new schema({

},
{
    timestamps:true
});


module.exports=mongo.model('CV',CVschema);