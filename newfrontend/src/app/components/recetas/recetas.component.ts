import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import {AuthService} from '../../services/auth.service'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.scss'],
  providers: [AuthService],
})
export class RecetasComponent implements OnInit {
 home=[];
 titulo='';
 categoria='';
 ingrediente='';
 receta={
   _id:'',
   titulo:'',
   categoria:'',
   ingrediente:''

 }
  constructor(private authservice:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.mostrarhome();
   
  }

  buscartitulo(form: NgForm){
  
  console.log(this.receta);
  console.log(this.titulo);
  console.log("wii paso por aqui");
  // this.authservice.Recetasfiltrostitulo(this.titulo);
  }
  
  buscarcategoria(form: NgForm){
    console.log(form);
    console.log(this.receta);
    console.log(this.categoria);
    this.authservice.buscarcategoria(this.receta);
    }
  like(like:any){
    console.log(like)
  }
  buscaringrediente(form: NgForm){
    console.log(form);
    console.log(this.receta);
    console.log(this.ingrediente);
    }
  mostrarhome(){
    this.authservice.Recetasfiltros()
    .subscribe(res=>{
       
      this.home = res ;
   
       console.log(this.home);
      
       console.log(res);
    }
    )
  }
  
}
