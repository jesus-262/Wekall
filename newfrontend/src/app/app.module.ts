import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//formulario
import { FormsModule} from '@angular/forms';
//http
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
//rutas asegurarlas
import { AuthGuard} from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';

//formularios

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { RecetasComponent } from './components/recetas/recetas.component';
import { HomeComponent } from './components/home/home.component';
import { PanelComponent } from './components/panel/panel.component';
import { HttpClient } from '@angular/common/http';
import { pipe } from './pipe';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbdToastGlobalModule } from './toast-global.module';
import { RecetarioComponent } from './components/recetario/recetario.component'; 
@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    RecetasComponent,
    HomeComponent,
    PanelComponent,
    pipe,
    RecetarioComponent
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbdToastGlobalModule
  ],
  providers: [
    AuthGuard,
    {
     provide:HTTP_INTERCEPTORS,
     useClass:TokenInterceptorService,
     multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
