import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoadMapComponent } from './road-map.component';

const routes: Routes = [
  {
    path: '',
    component: RoadMapComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoadMapRoutingModule {}
