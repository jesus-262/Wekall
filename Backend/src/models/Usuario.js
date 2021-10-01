const {Schema, model}=require("mongoose");

const usuarioSchema= new Schema({
email:String,
contrasena:String
},{
    timestamps:true
}
)

module.exports = model('Usuario',usuarioSchema)