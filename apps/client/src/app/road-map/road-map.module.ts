import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RoadMapRoutingModule } from './road-map-routing.module';
import { RoadMapComponent } from './road-map.component';
import { RoadMapCardComponent } from './components/road-map-card/road-map-card.component';

@NgModule({
  declarations: [RoadMapComponent, RoadMapCardComponent],
  imports: [SharedModule, RoadMapRoutingModule],
})
export class RoadMapModule {}
