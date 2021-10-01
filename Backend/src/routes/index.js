const {Router} = require('express');
const router=Router();
const Usuario=require('../models/Usuario');
const Receta=require('../models/receta');
const jwt=require("jsonwebtoken");



//rutas
router.get('/',(req,res)=>res.send("Hola"))


//registar
router.post('/registro', async (req,res)=>{
    console.log(req.body);
    const {email,contrasena}= req.body;
    console.log(email);
    const usuario = await Usuario.findOne({email})

    if(!usuario){ 
      console.log("el no existe")
    const newUsuario=new Usuario({email,contrasena})
    await newUsuario.save();
   
    token= jwt.sign({_id:newUsuario._id},'key')
    const tokenid=newUsuario.id;
    return res.status(200).json({token, tokenid})
  
  };

  return res.status(401).send("el correo ya existe")

})


router.post('/login', async (req,res)=>{
  
    const {email,contrasena}= req.body;
      
   const usuario = await Usuario.findOne({email})

  
    
   if(!usuario){ return res.status(401).send("el correo no existe")};
  
   if(usuario.contrasena !== contrasena) {return res.status(401).send("contraseña erronea")};

   if(usuario.contrasena === contrasena) {

   const token= jwt.sign({_id:Usuario._id},'key')
   const tokenid=usuario.id;
   return res.status(200).json({token, tokenid})};
})

router.get('/home',async (req,res)=>{

  const home =await Receta.find().sort({calificacion:-1}).limit(10);
  res.json(home);
  
})
router.get('/dashboard',async (req,res)=>{
  
    res.json([
        {
          _id:1,
          nombre:"jesus",
          descripcion:"salvador"
        },
        {
          _id:2,
          nombre:"caro",
          descripcion:"hermana"
        },
        {
          _id:3,
          nombre:"jaz",
          descripcion:"madre"
        },
        {
          _id:3,
          nombre:"carlos",
          descripcion:"padre"
        }
  
    ])
})
//----recetas
router.post('/receta', async (req,res)=>{
  console.log("por aqui paso");
 
  var {id_creador,titulo,descripcion,imagen,preparacion,ingrediente,nota,categoria,calificacion}= req.body;
  console.log("entro");
  console.log(titulo);
  console.log(id_creador);
  console.log(req.body.id_creador);
  const newReceta=new Receta({id_creador,titulo,descripcion,imagen,preparacion,ingrediente,nota,categoria,calificacion})
  await newReceta.save();
  res.json(newReceta)
 
 // return res.status(401).send("guardada la receta");
 
})
router.get('/receta', async (req,res)=>{
  const receta = await Receta.find();

  //return res.status(401).send("guardada la receta");
  return  res.json(receta)
})

router.get('/recetass/:id', async (req,res)=>{
  const {id}=req.params;

  const receta = await Receta.find({id_creador:id.toString()})
  //const receta = await Receta.find({"_id" : ObjectId("6154e2c44e400a5a2d418952")});
  //console.log(receta);

    
  res.json(receta)
 
})

router.put('/receta/:id', async (req,res)=>{

 const {_id}=req.body;
 console.log(_id)

 
 const newreceta={
 
  id_creador:req.body.id_creador,
  titulo: req.body.titulo,
  descripcion: req.body.descripcion,
  imagen: req.body.imagen,
  preparacion: req.body.preparacion,
  ingrediente: req.body.ingrediente,
  nota: req.body.nota,
  categoria:req.body.categoria,
  calificacion:req.body.calificacion

 }
 await Receta.findByIdAndUpdate(_id,{$set:newreceta},{new:true});
 
  res.json({status:'receta actualizada'})
  
 })


 router.delete('/receta/:id', async (req,res)=>{
  const {id}=req.params.id;
  console.log("quiero borrar")
console.log(req.body.id)
console.log(req.params.id)
 // await Receta.findOneAndRemove(req.params.id);
  await Receta.remove({"_id" : req.params.id});
   res.json({status:'receta borrada'})
   
  })

  //la pagina mas complicada recetas
  router.get('/recetas', async (req,res)=>{

    const {titulo,categoria,ingrediente}=req.body;
    console.log("entro a recetas y este es tu cuerpo")
    console.log(req.body);
    
    const receta =await Receta.find().sort({updatedAt:-1});
   
    //const receta = await Receta.find({"_id" : ObjectId("6154e2c44e400a5a2d418952")});
    //console.log(receta);
  

    res.json(receta)
   
  })
  router.get('/categoria', async (req,res)=>{

  
    console.log("entro a recetas y este es tu cuerpo")

    
    const receta =await Receta.find().sort({updatedAt:-1});
   
    //const receta = await Receta.find({"_id" : ObjectId("6154e2c44e400a5a2d418952")});
    //console.log(receta);
  

    res.json(receta)
   
  })
  router.get('/recetas/filtro', async (req,res)=>{
    console.log(req.query);
    let query = {};
  
    for (const key in req.query) {
      if (req.query[key]) {
        const toSave = {};
        toSave[key] = {$regex: req.query[key], $options: 'i'};
        query = {...query, ...toSave}
      }
    }
    console.log(query);
    const receta = await Receta.find(query);
    //console.log(receta);
    res.json(receta)    
  })

  router.patch('/recetas/:_id/calificacion', async (req,res)=>{
    const receta = await Receta.findByIdAndUpdate(req.params._id, {$inc:{calificacion: 1}}, {new: true});
    res.json({status:'receta actualizada', receta})
  })
  
module.exports = router;

function verificartoken(req,res,next){

    if(!req.headers.autorization){
        return res.status(401).send("no puedes ver estos datos")
    }

    const token =req.headers.autorization.split(' ')[1]
     console.log(token);
    if(token==='null'){

        return res.status(401).send("no puedes ver estos datos")

    }
        data= jwt.verify(token,'key')
       
      
        req.userid=data._id;
        next();
    
}

