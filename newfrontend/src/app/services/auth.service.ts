import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Router} from '@angular/router'
import { receta } from '../models/receta';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  seleccionarreceta:receta;
  //recetas: receta[];
  private URL ="http://localhost:3000/api"
  constructor(private http:HttpClient, private router:Router) {
    this.seleccionarreceta = new receta();

   }
   RecetasBuscarfiltros(query: any){
    let params = '';
    for (const key in query) {
      if (Object.prototype.hasOwnProperty.call(query, key)) {
        if(!!query[key]) {
          params += `${key}=${query[key]}&`;
        }
      }
    }
     return this.http.get<any>(`${this.URL}/recetas/filtro?${params}`);
   }
   Recetasfiltros(){
    return this.http.get<any>(this.URL+'/recetas');
   }
   buscarcategoria(categoria:any){
    return this.http.get<any>(this.URL+'/categoria');
  }
  RecetasLike(_id: any){
    return this.http.patch<any>(`${this.URL}/recetas/${_id}/calificacion`, {});
  }
   registro(usuario:any){

    return this.http.post<any>(this.URL+'/registro',usuario)

    
  }
  mostrarHome(){

    return this.http.get<any>(this.URL+'/home');
  }
  
login(usuario:any){

  return this.http.post<any>(this.URL+'/login',usuario)
}
mostrarRecetaslogeado(id:any){
  console.log("paseeeeeeeeeeeeeeeeeeeeeeeeeeeee");
  console.log(id);
  return this.http.get<any>(this.URL+'/recetass/'+`${id}`);
}
mostrarRecetas(){

  return this.http.get<any>(this.URL+'/receta');
}

borrarRecetas(id:any){
  console.log("a borrar mas");
  console.log(id);
  return this.http.delete<any>(this.URL+'/receta'+`/${id}`);
}
edictarRecetas(receta:any){
 
  return this.http.put<any>(this.URL+'/receta'+`/${receta._id}`,receta);
}
crearReceta(receta:any){

   console.log("entro a receta")
  return this.http.post<any>(this.URL+'/receta',receta);
}
 
 token(){
  // me retorna un true o false
  return !!localStorage.getItem('token')
  
}
 getToken(){
  // me retorna un true o false
 
  return  localStorage.getItem('token');

  
}
salir(){
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}
}
