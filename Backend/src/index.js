const express =require ("express");
const app= express();
const cors=require('cors');



require('./database')
app.use(cors(
{
    origin: "http://localhost:4200"

}
));
/*
app.use(cors({
    credentials: true,
    ControlAllowCredentials:true,
    origin: "http://localhost:4200"
  }));*/
app.use(express.json());

app.use('/api',require('./routes/index'))


app.listen(3000);
console.log("iniciando servidor",3000);