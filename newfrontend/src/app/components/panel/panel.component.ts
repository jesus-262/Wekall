import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
//import { receta } from 'src/app/models/receta';
import { AuthService } from "../../services/auth.service";
import { ToastService } from "../../toast-service";


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  providers: [AuthService],
})
export class PanelComponent implements OnInit {
n=0; 
  receta={
    _id:'',
    id_creador:localStorage.getItem('id'),
    titulo: '',
    descripcion: '',
    imagen: '',
    preparacion: '',
    ingrediente: '',
    nota: '',
    categoria:'',
    calificacion:0
    }
    mostarReceta=[];
  
  constructor(private authservice:  AuthService, private toastService:ToastService) {}
  
  ngOnInit(): void {
    this.mostrarrecetaslogeado();
  }
  edictarrecetaslogeado(r:{_id:'',id_creador:'',titulo:'',descripcion:'',imagen:'',preparacion:'',ingrediente:'',nota:'',categoria:'',calificacion:0}){
  console.log(r);
  this.receta._id=r._id;
  this.receta.id_creador=localStorage.getItem('id');
  this.receta.titulo=r.titulo;
  this.receta.descripcion=r.descripcion;
  this.receta.imagen=r.imagen;
  this.receta.preparacion=r.preparacion;
  this.receta.ingrediente=r.ingrediente;
  this.receta.nota=r.nota;
  this.receta.categoria=r.categoria;
  this.receta.calificacion=r.calificacion;
  }
  mostrarrecetaslogeado(){
    this.authservice.mostrarRecetaslogeado(this.receta.id_creador)
    .subscribe(res=>{
       
      this.mostarReceta = res ;
   
       console.log(this.mostarReceta);
      
    console.log(res);
    }


    )
  }
  agregarreceta(form: NgForm){

  
 
 
   // var m= this.authservice.seleccionarreceta.titulo;
   //var tokenData = JSON.parse(localStorage.getItem('token').);
//console.log(tokenData.access_token);
 if(form.value._id){
  console.log("va a edictar")
this.authservice.edictarRecetas(this.receta)
.subscribe(res=>{
  this.showStandard("Receta actualizada");
  this.resetForm(form);
 

  

 
  this.mostrarrecetaslogeado();
}

)

 }else{
  console.log("para crear una categoria");
 console.log(this.receta.categoria);
    this.authservice.crearReceta(this.receta)    
    .subscribe(res=>{
      this.showStandard("Receta creada");

     
   
     this.mostrarrecetaslogeado();
     this.resetForm(form);
    });
   
    console.log("agregando")
}
   
   
  }
  showStandard(texto:string) {
    this.toastService.show(texto);
  }
  eliminarrecetaslogeado(_id:any){
  console.log("a borrar");
  this.authservice.borrarRecetas(_id)
  .subscribe(res=>{
    this.showStandard("Receta eliminada");
 
   
   
    this.mostrarrecetaslogeado();
   });

  }
 
/*this.authservice.
  recetas() {
    this.authservice.mostrarRecetas.subscribe((res) => {
      this.authservice.employees = res;
    });
  }*/
  resetForm(form?: NgForm) {
    console.log("borrando lista");
    if (form) {
  
      form.reset();
      this.receta={
        _id:'',
        id_creador:localStorage.getItem('id'),
        titulo: '',
        descripcion: '',
        imagen: '',
        preparacion: '',
        ingrediente: '',
        nota: '',
        categoria:'',
        calificacion:0
        }
   
    }
  }
}
