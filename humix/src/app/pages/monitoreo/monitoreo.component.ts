import { Component } from '@angular/core';

@Component({
  selector: 'app-monitoreo',
  templateUrl: './monitoreo.component.html',
  styleUrls: ['./monitoreo.component.css'],
})
export class MonitoreoComponent {
  estado: string = 'Esperando';
  numero: number = 1;
  nivel: string = 'Normal';
  niveles: string[] = ['Bajo', 'Normal', 'Alto', 'Crítico'];

  toggleEstado(event: any) {
    this.estado = event.target.checked ? 'Actualizado' : 'Esperando';
  }
}
