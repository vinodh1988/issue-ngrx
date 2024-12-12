import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssuesComponent } from './issues/issues.component';

const routes: Routes = [
  { path: '', component: IssuesComponent},
  { path: 'prioritization', loadChildren: () => import('./prioritization/prioritization.module').then(m => m.PrioritizationModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
