import { Component, OnInit } from '@angular/core';
import { HumedadService } from 'src/app/services/humedad.service';
import { IotService } from 'src/app/services/iot.service';

@Component({
  selector: 'app-monitoreo',
  templateUrl: './monitoreo.component.html',
  styleUrls: ['./monitoreo.component.css']
})
export class MonitoreoComponent implements OnInit {

  ultimas: any[] = [];
  conductividad: any;

  constructor(private humS: HumedadService,
    private iot: IotService
  ) {}

  ngOnInit() {
    this.humS.ultimasMedidas().subscribe(data => {
      this.ultimas = data;
      console.log(data);
      
      
    });

    this.iot.getUltimaConductividad().subscribe(data => {
      this.conductividad = data.conductividad;
    });
  }
}

