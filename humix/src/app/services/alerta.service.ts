import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AlertaService {
  private alertSource = new Subject<string>();
  alert$ = this.alertSource.asObservable();

  enviar(mensaje: string) {
    this.alertSource.next(mensaje);
  }
}
