import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import { Router } from '@angular/router';
import {AppComponent} from '../../app.component'
import { ToastService } from "../../toast-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  show = false;
  mensaje='';
  usuario={
    email:'',
    contrasena:''
    }
  constructor(private authService:AuthService, private router:Router,private app:AppComponent,private toastService:ToastService) { }

  ngOnInit(): void {

   
  }
  showStandard(texto:string) {
    this.toastService.show(texto);
  }
  login(){
  this.authService.login(this.usuario)
  .subscribe(
      async res=>{
       
       console.log(res.tokenid)

      
     //  localStorage.setItem('id', this.usuario.contrasena)
     //  localStorage.setItem('token', res.token)
   

      
       localStorage.setItem('id', res.tokenid)
       localStorage.setItem('token', res.token)

     //localStorage.setItem('id', res.tokenid)
       //console.log(JSON.parse(m.ToString()))
       this.app.loginhtml();
       this.mensaje="Iniciaste session";
       this.show = true;
       this.showStandard('Inicio seccion');
      /* M.toast({
        html:'Inicio seccion', 
        displayLength:6000,
        classes:"green"
        }
        ) */
       this.router.navigate(['/panel']);
      
     },
     
     err=> { 
       console.log(err.error) 
       this.mensaje=err.error;
       this.show = true;
       this.showStandard(err.error);
       /*
       M.toast({
        html:err.error, 
        displayLength:6000,
        classes:"red"
        }
        ) */
    
    } 
    
     
  )
}

}
