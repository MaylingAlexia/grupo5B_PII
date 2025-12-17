import { Component } from '@angular/core';
import { IotService } from 'src/app/services/iot.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html'
})
export class ControlComponent {

  deshumidificador = false;
  loading = false; // ⚡ para bloquear el switch mientras se envía

  constructor(private iot: IotService) {}

  toggleDeshumidificador() {
    if (this.loading) return; // evita doble click
    this.loading = true;

    const accion = this.deshumidificador ? 'on' : 'off';

    this.iot.setDeshumidificador(accion).subscribe({
      next: (res) => {
        console.log('Comando enviado correctamente:', res);
        alert('Comando enviado correctamente');
        this.loading = false; // liberar el switch
      },
      error: (err) => {
        console.error('Error al enviar comando:', err);
        alert('No se pudo enviar el comando al deshumidificador');
        this.deshumidificador = !this.deshumidificador; // revertir estado
        this.loading = false; // liberar el switch
      }
    });
  }
}