import { Component, OnInit } from '@angular/core';
import { GravedadService } from 'src/app/services/gravedad.service';

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css']
})
export class RecomendacionesComponent implements OnInit {

  mensaje = '';
  respuesta = '';
  gravedad: string = '';
  score: number = 0;
  opcionSeleccionada: string = '';

  // Listas hardcodeadas según la gravedad
  labelsUno: string[] = [
    'Ventilar la casa diariamente al menos 15 minutos.',
    'Usar deshumidificadores pequeños en habitaciones cerradas.',
    'Evitar secar ropa dentro de la casa.'
  ];

  labelsDos: string[] = [
    'Instalar extractores de aire en cocina y baño.',
    'Colocar bolsas de gel de sílice en armarios.',
    'Revisar filtraciones de agua en ventanas y techos.'
  ];

  labelsTres: string[] = [
    'Usar deshumidificadores potentes con capacidad adecuada.',
    'Reparar goteras y filtraciones inmediatamente.',
    'Aplicar pintura antihumedad en paredes y techos.',
    'Considerar revisión profesional de la estructura de la vivienda.'
  ];

  constructor(private gravedadService: GravedadService) {}

  ngOnInit() {
    // Evaluar la gravedad
    this.gravedadService.evaluarHumedad().subscribe(resultado => {
      this.gravedad = resultado.gravedad;
      this.score = resultado.score;

      // Seleccionar lista según gravedad
      if (this.gravedad === 'baja') this.opcionSeleccionada = 'uno';
      else if (this.gravedad === 'media') this.opcionSeleccionada = 'dos';
      else if (this.gravedad === 'alta') this.opcionSeleccionada = 'tres';

      // Mensaje dinámico
      this.mensaje = `Tengo niveles de humedad ${this.gravedad} (score ${this.score}). ` +
                     `Recomiéndame un plan de acción para mitigar la humedad en mi hogar.`;
    });
  }

  // Hardcodeamos respuesta simulada
  enviar() {
    if (this.opcionSeleccionada === 'uno') {
      this.respuesta = 'Recomendaciones para humedad baja mostradas arriba.';
    } else if (this.opcionSeleccionada === 'dos') {
      this.respuesta = 'Recomendaciones para humedad media mostradas arriba.';
    } else if (this.opcionSeleccionada === 'tres') {
      this.respuesta = 'Recomendaciones para humedad alta mostradas arriba.';
    }
  }
}