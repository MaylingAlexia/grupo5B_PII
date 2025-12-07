import { Component } from '@angular/core';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css'],
})
export class ControlComponent {
  switchVentilador = false;
  switchLuz = false;
  switchDes = false;

  toggleSwitch(num: number) {
    if (num === 1) this.switchVentilador = !this.switchVentilador;
    if (num === 2) this.switchLuz = !this.switchLuz;
    if (num === 3) this.switchDes = !this.switchDes;
  }
}
