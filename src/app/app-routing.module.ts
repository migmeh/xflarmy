import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MoonshotComponent} from './components/moonshot/moonshot.component';
import {InicioComponent} from './components/inicio/inicio.component';

const routes: Routes = [




  { path: '', component: InicioComponent },
  { path: 'game/Moonshot', component: MoonshotComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
