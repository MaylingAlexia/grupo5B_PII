import { Component } from '@angular/core';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.css'],
})
export class AvisosComponent {
  avisos: string[] = [
    'Aviso 1: Humedad alta detectada en el sensor 3.',
    'Aviso 2: Sensor 5 desconectado.',
    'Aviso 3: Mantenimiento programado para el sistema de riego.',
  ];
}
