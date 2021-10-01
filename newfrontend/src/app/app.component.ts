import { Component } from '@angular/core';
import {AuthService} from './services/auth.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService],
})
export class AppComponent {
  
  constructor(private authservise:AuthService,private router:Router){

  }
  loginhtml():boolean{
   
 
  
  if(localStorage.getItem('token')){
   
    return true;
  }
  
  return false;
  }
  salirhtml(){
    
    localStorage.removeItem('token');
    this.loginhtml();
   this.router.navigate(['/login']);
    }
  title = 'Frontend';
}
