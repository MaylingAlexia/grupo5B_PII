import { Component, OnInit } from '@angular/core';
import { AlertaService } from 'src/app/services/alerta.service';

interface Aviso {
  mensaje: string;
  hora: string;
}

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.css']
})
export class AvisosComponent implements OnInit {
  mensajes: Aviso[] = [];
  maxAvisos = 10;

  constructor(private alertService: AlertaService) {}

  ngOnInit() {
    // Cargar avisos previos desde localStorage
    const guardados = localStorage.getItem('avisos');
    if (guardados) {
      const parsed = JSON.parse(guardados);
      this.mensajes = parsed.map((m: any) => 
        typeof m === 'string' ? { mensaje: m, hora: new Date().toLocaleTimeString() } : m
      );
    }

    // Escuchar nuevos avisos
    this.alertService.alert$.subscribe(msg => {
      const nuevo: Aviso = { mensaje: msg, hora: new Date().toLocaleTimeString() };
      this.mensajes.push(nuevo);

      // Limitar cantidad de avisos
      if (this.mensajes.length > this.maxAvisos) this.mensajes.shift();

      // Guardar en localStorage
      localStorage.setItem('avisos', JSON.stringify(this.mensajes));
    });
  }
}