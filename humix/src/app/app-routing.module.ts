import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvisosComponent } from './pages/avisos/avisos.component';
import { ControlComponent } from './pages/control/control.component';
import { GravedadComponent } from './pages/gravedad/gravedad.component';
import { MonitoreoComponent } from './pages/monitoreo/monitoreo.component';
import { RecomendacionesComponent } from './pages/recomendaciones/recomendaciones.component';
import { IndexComponent } from './pages/index/index.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'Avisos',
    component: AvisosComponent,
  },
  {
    path: 'Control',
    component: ControlComponent,
  },
  {
    path: 'Gravedad',
    component: GravedadComponent,
  },
  {
    path: 'Monitoreo',
    component: MonitoreoComponent,
  },
  {
    path: 'Recomendaciones',
    component: RecomendacionesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
