import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  aceptCookie(){
    let mycookie = localStorage.setItem("mycookie", "yes");
  }
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem("mycookie") === "yes"){
      $("#mycookie").hide();
    }
  }

}
