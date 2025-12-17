import { Injectable } from '@angular/core';
import { IotService } from './iot.service';
import { AlertaService } from './alerta.service';

@Injectable({
  providedIn: 'root'
})
export class GravedadService {
  gravedad: string = '';
  score: number = 0;

  constructor(private iot: IotService,
    private alertService: AlertaService,
  ){}
  evaluarHumedad() {
    let hum = 0;
    let cond = 0;
    let horas_alta = 0;

    // 1️⃣ Humedad máxima últimas 48h
    this.iot.getBiggest2Day().subscribe((data: any) => {
      hum = data.humedad;

      // 2️⃣ Conductividad máxima hoy
      this.iot.getMaxConductividadHoy().subscribe((dataCond: any) => {
        cond = dataCond.conductividad;

        // 3️⃣ Horas de humedad alta últimas 24h
        this.iot.getLogsUltimas24H().subscribe((logs: any[]) => {
          const umbral = 70;
          const intervaloMin = 5; // cada lectura 5 min
          horas_alta = logs.filter(r => r.humedad > umbral).length * intervaloMin / 60;

          // 4️⃣ Calculo de score y gravedad
          this.score = 0;
          if (hum > 70) {this.score += 2;this.iot.setDeshumidificador('on').subscribe();} else {this.iot.setDeshumidificador('off').subscribe();}
          if (cond > 300) this.score += 1;
          if (horas_alta > 6) this.score += 2;

          this.gravedad =
            this.score >= 4 ? 'alta' :
            this.score >= 2 ? 'media' : 'baja';

          console.log('Score:', this.score, 'Gravedad:', this.gravedad);
          this.alertService.enviar('Score:'+ this.score+ 'Gravedad:'+ this.gravedad);
        });
      });
    });
  }
}
