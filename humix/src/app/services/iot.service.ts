import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertaService } from './alerta.service';

@Injectable({
  providedIn: 'root'
})
export class IotService {

  private API = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private alertService: AlertaService
  ) {}

  getEstado() {
    this.alertService.enviar('🔍 Consultando estado actual del sistema...');
    return this.http.get(`${this.API}/estado`);
  }

  setDeshumidificador(accion: 'on' | 'off') {
    const mensaje = accion === 'on'
      ? '💧 Deshumidificador ACTIVADO'
      : '💤 Deshumidificador DESACTIVADO';
    
    this.alertService.enviar(mensaje);

    return this.http.post(`${this.API}/deshumidificador`, { accion });
  }

  getHistorico() {
    this.alertService.enviar('📊 Obteniendo historial de humedad...');
    return this.http.get<any[]>(`${this.API}/humedad/historico`);
  }

  getSensoresH() {
    this.alertService.enviar('🛰️ Consultando sensores disponibles...');
    return this.http.get<any[]>(`${this.API}/humedad/sensores`);
  }

  getLastMesure() {
    this.alertService.enviar('⏱️ Obteniendo últimas mediciones de humedad...');
    return this.http.get<any[]>(`${this.API}/humedad/ultimas`);
  }

  getBiggest2Day() {
    this.alertService.enviar('📈 Calculando humedad máxima de las últimas 48h...');
    return this.http.get<any[]>(`${this.API}/humedad/max-hoy`);
  }

  getPromedioSemanal() {
    this.alertService.enviar('📅 Calculando promedio semanal de humedad...');
    return this.http.get<any[]>(`${this.API}/humedad/promedio/diario/semana`);
  }

  getPromedioMensual() {
    this.alertService.enviar('📅 Calculando promedio mensual de humedad...');
    return this.http.get<any[]>(`${this.API}/humedad/promedio/diario/mensual`);
  }

  getUltimaConductividad() {
    this.alertService.enviar('💡 Obteniendo última medición de conductividad...');
    return this.http.get<any>(`${this.API}/conductividad/ultimo`);
  }

  getMaxConductividadHoy() {
    this.alertService.enviar('⚡ Obteniendo máxima conductividad de hoy...');
    return this.http.get<any>(`${this.API}/conductividad/maxHoy`);
  }

  getLogsUltimas24H() {
    this.alertService.enviar('🕒 Cargando logs de humedad últimas 24h...');
    return this.http.get<any[]>(`${this.API}/humedad/ultimas24h`);
  }

  enviarAlertaPersonalizada(msg: string) {
    const mensaje = `⚠️ ALERTA: ${msg}`;
    this.alertService.enviar(mensaje);
  }
}