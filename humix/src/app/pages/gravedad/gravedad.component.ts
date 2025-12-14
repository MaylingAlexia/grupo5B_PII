import { Component } from '@angular/core';

@Component({
  selector: 'app-gravedad',
  templateUrl: './gravedad.component.html',
  styleUrls: ['./gravedad.component.css'],
})
export class GravedadComponent {
  nivelesGravedad: string[] = ['Baja', 'Media', 'Alta', 'Crítica'];
  nivelGravedad: string = this.nivelesGravedad[0];
  accionGravedad: string = '';

  seleccionarNivel(nivel: string) {
    this.nivelGravedad = nivel;
  }
}
