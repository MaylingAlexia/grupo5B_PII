import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-grafico-barras',
  templateUrl: './grafico-barras.component.html',
  styleUrls: ['./grafico-barras.component.css']
})
export class GraficoBarrasComponent implements AfterViewInit {

  @ViewChild('semanal') canvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    const ctx = this.canvas.nativeElement.getContext('2d');

    new Chart(ctx!, {
      type: 'bar',
      data: {
        labels: ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'],
        datasets: [
          {
            label: 'Humedad (%)',
            data: [60, 55, 70, 65, 80, 75, 68],
            backgroundColor: 'rgba(86,69,146,0.85)'
          }
        ]
      }
    });
  }
}
