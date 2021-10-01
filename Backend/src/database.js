const mongoose =require("mongoose");

mongoose.connect('mongodb://localhost/Recetario',{
useNewUrlParser:true,
useUnifiedTopology:true

})
.then(db=>console.log("base de datos funcionando"))
.catch(err => console.log(err));