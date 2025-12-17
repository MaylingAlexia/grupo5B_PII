import { Component, OnInit } from '@angular/core';
import { GravedadService } from 'src/app/services/gravedad.service';

@Component({
  selector: 'app-gravedad',
  templateUrl: './gravedad.component.html',
  styleUrls: ['./gravedad.component.css']
})
export class GravedadComponent implements OnInit{
  gravedad: string = '';
  score: number = 0;

  constructor(private gravedadService: GravedadService){}

  ngOnInit() {
    this.gravedadService.evaluarHumedad().subscribe(resultado => {
      this.gravedad = resultado.gravedad;
      this.score = resultado.score;
    });
  }

}
