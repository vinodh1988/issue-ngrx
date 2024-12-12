import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrioritizationComponent } from './prioritization.component';

const routes: Routes = [{ path: '', component: PrioritizationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrioritizationRoutingModule { }
