import { Injectable } from '@angular/core';
import { IotService } from './iot.service';
import { AlertaService } from './alerta.service';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GravedadService {

  constructor(
    private iot: IotService,
    private alertService: AlertaService
  ) {}

  evaluarHumedad(): Observable<{ gravedad: string, score: number }> {

    // 1️⃣ Obtener humedad máxima últimas 48h
    return this.iot.getBiggest2Day().pipe(
      switchMap((data: any) => {
        const hum = data.humedad;

        // 2️⃣ Obtener conductividad máxima hoy
        return this.iot.getMaxConductividadHoy().pipe(
          switchMap((dataCond: any) => {
            const cond = dataCond.conductividad;

            // 3️⃣ Obtener logs últimas 24h
            return this.iot.getLogsUltimas24H().pipe(
              map((logs: any[]) => {
                const umbral = 70;
                const intervaloMin = 5;
                const horas_alta = logs.filter(r => r.humedad > umbral).length * intervaloMin / 60;

                // 4️⃣ Calcular score y gravedad
                let score = 0;
                if (hum > 70) {
                  score += 2;
                  this.iot.setDeshumidificador('on').subscribe();
                } else {
                  this.iot.setDeshumidificador('off').subscribe();
                }
                if (cond > 300) score += 1;
                if (horas_alta > 6) score += 2;

                const gravedad =
                  score >= 4 ? 'alta' :
                  score >= 2 ? 'media' : 'baja';

                // 5️⃣ Enviar alerta
                this.alertService.enviar(`Score: ${score}, Gravedad: ${gravedad}`);

                return { gravedad, score };
              })
            );
          })
        );
      })
    );
  }
}
