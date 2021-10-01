import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import {AuthService} from '../../services/auth.service'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [AuthService],
})
export class HomeComponent implements OnInit {
 home=[];
  constructor(private authservice:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.mostrarhome();
  }
  mostrarhome(){
    this.authservice.mostrarHome()
    .subscribe(res=>{
       
      this.home = res ;
   
       console.log(this.home);
      
       console.log(res);
    }
    )
  }
  
}
