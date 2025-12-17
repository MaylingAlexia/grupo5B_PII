import { Component } from '@angular/core';
import { IotService } from 'src/app/services/iot.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html'
})
export class ControlComponent {

  deshumidificador = false;

  constructor(private iot: IotService) {}

  toggleDeshumidificador() {
    const accion = this.deshumidificador ? 'on' : 'off';

    this.iot.setDeshumidificador(accion).subscribe();
  }
}
