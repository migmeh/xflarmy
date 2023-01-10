import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MoonshotComponent} from './components/moonshot/moonshot.component';
import {InicioComponent} from './components/inicio/inicio.component';
import {ChessComponent} from './components/chess/chess.component';

const routes: Routes = [




  { path: '', component: InicioComponent },
  { path: 'game/Moonshot', component: MoonshotComponent },
  { path: 'game/Chess', component: ChessComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
