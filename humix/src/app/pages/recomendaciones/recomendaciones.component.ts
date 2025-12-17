import { Component } from '@angular/core';
import { IaService } from 'src/app/services/ia.service';

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

  // chat.component.ts
  mensaje = '';
  respuesta = '';

  constructor(private ia: IaService) {}

  enviar() {
    this.ia.pedir(this.mensaje).subscribe(res => {
      this.respuesta = res.answer;
    });
  }
}
