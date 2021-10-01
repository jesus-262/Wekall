import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { receta } from 'src/app/models/receta';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../toast-service';
@Component({
  selector: 'app-recetario',
  templateUrl: './recetario.component.html',
  styleUrls: ['./recetario.component.scss'],
})
export class RecetarioComponent implements OnInit {
  home: any = [];
  titulo = '';
  categoria = '';
  ingrediente = '';
  receta = {
    _id: '',
    titulo: '',
    categoria: '',
    ingrediente: '',
  };
  constructor(
    private authservice: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.mostrarhome();
  }

  buscarFiltro(form: NgForm) {
    this.authservice.RecetasBuscarfiltros(form.value).subscribe((res) => {
      this.home = res;
    });
  }

  like(element: any) {
    this.authservice.RecetasLike(element._id).subscribe((res) => {
      const indexReceta = this.home.findIndex((receta: any) => receta._id == res.receta._id);
      this.home[indexReceta] = res.receta;
    });
  }

  mostrarhome() {
    this.authservice.Recetasfiltros().subscribe((res) => {
      this.home = res;

      console.log(this.home);

      console.log(res);
    });
  }

}
