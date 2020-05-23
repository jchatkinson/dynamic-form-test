import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalcComponent } from './calc/calc.component';


const routes: Routes = [
  { path: 'calc', component: CalcComponent},
  { path: '',    redirectTo: 'calc',   pathMatch: 'full' },
  { path: '**', component: CalcComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
