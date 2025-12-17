import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { IotService } from 'src/app/services/iot.service';

@Component({
  selector: 'app-grafico-linea',
  templateUrl: './grafico-linea.component.html',
  styleUrls: ['./grafico-linea.component.css']
})
export class GraficoLineaComponent implements AfterViewInit {

  @ViewChild('funcion') canvas!: ElementRef<HTMLCanvasElement>;

  constructor(private iot: IotService) {}

  ngAfterViewInit() {

    this.iot.getPromedioMensual().subscribe(rows => {

      // eje X → día del mes
      const datos = rows.map(r => ({
        x: new Date(r.dia).getDate(),
        y: r.promedio
      }));

      const ctx = this.canvas.nativeElement.getContext('2d');

      new Chart(ctx!, {
        type: 'line',
        data: {
          datasets: [
            {
              label: 'Humedad promedio mensual (%)',
              data: datos,
              borderColor: 'rgba(86,69,146,0.85)',
              backgroundColor: 'rgba(86,69,146,0.85)',
              fill: false,
              pointRadius: 4,
              tension: 0
            }
          ]
        },
        options: {
          scales: {
            x: {
              type: 'linear',
              title: { display: true, text: 'Día del mes' },
              ticks: { stepSize: 1 }
            },
            y: {
              title: { display: true, text: 'Humedad (%)' }
            }
          }
        }
      });

    });
  }
}