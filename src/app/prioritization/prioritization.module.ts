import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrioritizationRoutingModule } from './prioritization-routing.module';
import { PrioritizationComponent } from './prioritization.component';
import { StoreModule } from '@ngrx/store';
import * as fromPrioritization from '../ngrx/reducers/prioritization.reducers'
import { PrioritizationEffects } from '../ngrx/effects/prioritization.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    PrioritizationComponent
  ],
  imports: [
    CommonModule,
    PrioritizationRoutingModule,
    StoreModule.forFeature(fromPrioritization.prioritizationFeatureKey,fromPrioritization.reducer)
    //{fromPrioritization.prioritizationFeatureKey: fromPrioritization.reducer}
    ,
    EffectsModule.forFeature([PrioritizationEffects]) 
  ]
})
export class PrioritizationModule { }
