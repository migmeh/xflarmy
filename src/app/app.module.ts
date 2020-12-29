import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoonshotComponent } from './components/moonshot/moonshot.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { BarComponent } from './components/bar/bar.component';
import { ChessComponent } from './components/chess/chess.component';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [
    AppComponent,
    MoonshotComponent,
    InicioComponent,
    BarComponent,
    ChessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
