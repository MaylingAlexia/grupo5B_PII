import { Injectable } from '@angular/core';
import { IotService } from './iot.service';

@Injectable({
  providedIn: 'root'
})
export class HumedadService {

  constructor(private iot: IotService) {}

  cantidadDeESP(){
    return this.iot.getSensoresH()
  }

  ultimasMedidas(){
    return this.iot.getLastMesure();
  }
}