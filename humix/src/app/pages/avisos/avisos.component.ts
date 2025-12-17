import { Component, OnInit } from '@angular/core';
import { AlertaService } from 'src/app/services/alerta.service';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.css']
})
export class AvisosComponent {
  labels = ['Aviso 1', 'Aviso 2', 'Aviso 3'];

  mensajes: string[] = [];

  constructor(private alertService: AlertaService) {}

  ngOnInit() {
    this.alertService.alert$.subscribe(msg => {
      this.mensajes.push(msg);
      // opcional: remover después de unos segundos
      setTimeout(() => this.mensajes.shift(), 5000);
    });
  }
}
