import { Component } from '@angular/core';

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css']
})
export class RecomendacionesComponent {
  opcionSeleccionada = 'dos'; // opción por defecto

  // Datos para cada vista
  labelsUno = ['Label 1', 'Label 2', 'Label 3'];
  labelsDos = ['Otro 1', 'Otro 2', 'Otro 3', 'Otro 4'];
  labelsTres = ['X', 'Y', 'Z'];

}
