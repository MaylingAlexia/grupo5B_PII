import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { IotService } from 'src/app/services/iot.service';

@Component({
  selector: 'app-grafico-barras',
  templateUrl: './grafico-barras.component.html',
  styleUrls: ['./grafico-barras.component.css']
})
export class GraficoBarrasComponent implements AfterViewInit {

  @ViewChild('semanal') canvas!: ElementRef<HTMLCanvasElement>;

  constructor(private iot: IotService) {}

  ngAfterViewInit() {

    this.iot.getPromedioSemanal().subscribe(rows => {

      const labels = rows.map(r =>
        new Date(r.dia).toLocaleDateString('es-CL', { weekday: 'short' })
      );

      const data = rows.map(r => r.promedio);

      const ctx = this.canvas.nativeElement.getContext('2d');

      new Chart(ctx!, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Humedad promedio (%)',
              data,
              backgroundColor: 'rgba(86,69,146,0.85)'
            }
          ]
        }
      });

    });
  }
}