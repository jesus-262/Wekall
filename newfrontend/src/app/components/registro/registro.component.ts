import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'

import { Router } from '@angular/router';
import { ToastService } from "../../toast-service";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
usuario={
email:'',
contrasena:''
}
  constructor(private authService:AuthService, private router:Router,private toastService:ToastService) { }

  ngOnInit(): void {
  }

  showStandard(texto:string) {
    this.toastService.show(texto);
  }
  registro(){
 console.log(this.usuario)
 this.authService.registro(this.usuario)
 .subscribe(
    res=>{
      console.log(res)
      localStorage.setItem('id', res.tokenid)
      localStorage.setItem('token', res.token)
      this.showStandard("Inicio session");
      this.router.navigate(['/panel']);
    },
    err=> { 
      console.log(err.error) 

      this.showStandard(err.error);
     
   
   } 
 )
  }
}
