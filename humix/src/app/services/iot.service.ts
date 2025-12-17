import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertaService } from './alerta.service';

@Injectable({
  providedIn: 'root'
})
export class IotService {

  private API = 'http://localhost:3000/api';

  constructor(private http: HttpClient,
    private alertService: AlertaService
  ) {}

  getEstado() {
    return this.http.get(`${this.API}/estado`);
  }

  setDeshumidificador(accion: 'on' | 'off') {
    this.alertService.enviar(accion);
    return this.http.post(`${this.API}/deshumidificador`, { accion });
  }

  getHistorico() {
    return this.http.get<any[]>('http://localhost:3000/api/humedad/historico');
  }

  getSensoresH() {
    return this.http.get<any[]>('http://localhost:3000/api/humedad/sensores');
  }

  getLastMesure(){
    return this.http.get<any[]>('http://localhost:3000/api/humedad/ultimas');
  }

  getBiggest2Day(){
    return this.http.get<any[]>('http://localhost:3000/api/humedad/max-hoy');
  }

  getPromedioSemanal(){
    return this.http.get<any[]>('http://localhost:3000/api/humedad/promedio/diario/semana');
  }

  getPromedioMensual(){
    return this.http.get<any[]>('http://localhost:3000/api/humedad/promedio/diario/mensual');
  }

  getUltimaConductividad() {
    return this.http.get<any>('http://localhost:3000/api/conductividad/ultimo');
  }

  getMaxConductividadHoy(){
    return this.http.get<any>('http://localhost:3000/api/conductividad/maxHoy');
  }

  getLogsUltimas24H() {
  return this.http.get<any[]>('http://localhost:3000/api/humedad/ultimas24h');
}


}
