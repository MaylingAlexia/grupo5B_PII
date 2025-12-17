import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-grafico-linea',
  templateUrl: './grafico-linea.component.html',
  styleUrls: ['./grafico-linea.component.css']
})
export class GraficoLineaComponent implements AfterViewInit {

  @ViewChild('funcion') canvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    const ctx = this.canvas.nativeElement.getContext('2d');

    const datos = [
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 1 },
      { x: 4, y: 4 },
      { x: 5, y: 2 }
    ];

    new Chart(ctx!, {
      type: 'line', // Cambiado de 'scatter' a 'line'
      data: {
        datasets: [
          {
            label: 'Mi función',
            data: datos,
            borderColor: 'rgba(86,69,146,0.85)',
            backgroundColor: 'rgba(86,69,146,0.85)',
            fill: false,
            showLine: true,   // Conecta los puntos
            pointRadius: 6,
            tension: 0        // 0 = líneas rectas entre puntos
          }
        ]
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            title: { display: true, text: 'Eje X' }
          },
          y: {
            title: { display: true, text: 'Eje Y' }
          }
        }
      }
    });
  }
}