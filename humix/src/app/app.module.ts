import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ControlComponent } from './pages/control/control.component';
import { MonitoreoComponent } from './pages/monitoreo/monitoreo.component';
import { AvisosComponent } from './pages/avisos/avisos.component';
import { GravedadComponent } from './pages/gravedad/gravedad.component';
import { RecomendacionesComponent } from './pages/recomendaciones/recomendaciones.component';
import { BarNavComponent } from './components/bar-nav/bar-nav.component';
import { IndexComponent } from './pages/index/index.component';
import { GraficoBarrasComponent } from './components/grafico-barras/grafico-barras.component';
import { GraficoLineaComponent } from './components/grafico-linea/grafico-linea.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlComponent,
    MonitoreoComponent,
    AvisosComponent,
    GravedadComponent,
    RecomendacionesComponent,
    BarNavComponent,
    IndexComponent,
    GraficoBarrasComponent,
    GraficoLineaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
