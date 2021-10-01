import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//componentes
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import { RecetarioComponent } from './components/recetario/recetario.component';
import {RecetasComponent} from './components/recetas/recetas.component';
import {PanelComponent} from './components/panel/panel.component';
import {RegistroComponent} from './components/registro/registro.component';

//asegurar rutas
import { AuthGuard} from './auth.guard';
const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    pathMatch:'full'
  },
  {
    path:'recetas',
    component: RecetarioComponent
   
  },
{
  path:"panel",
  component: PanelComponent,
  canActivate:[AuthGuard]
},
{
  path:"login",
  component: LoginComponent
},
{
  path:"registro",
  component: RegistroComponent
}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
